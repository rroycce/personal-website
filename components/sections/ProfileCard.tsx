import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/components/providers/LanguageProvider'
import Image from 'next/image'

export const ProfileCard = () => {
	const { t } = useLanguage()
	const cardRef = useRef<HTMLDivElement>(null)
	const lastTouchRef = useRef<number>(0)
	const isMobileRef = useRef<boolean>(false)

	const [rotate, setRotate] = useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = useState(false)
	const [isPressed, setIsPressed] = useState(false)

	const [crackGroups, setCrackGroups] = useState<
		{
			id: string
			cracks: { id: number; points: string; width: number; opacity: number }[]
			isFading: boolean
		}[]
	>([])

	const [isShattered, setIsShattered] = useState(false)
	const [isRespawning, setIsRespawning] = useState(false)

	const [generatedShards, setGeneratedShards] = useState<
		{
			id: string
			clipPath: string
			tx: number
			burstY: number
			tz: number
			rx: number
			ry: number
			rz: number
		}[]
	>([])

	useEffect(() => {
		const checkMobile = () => {
			isMobileRef.current =
				window.innerWidth < 768 ||
				/Mobi|Android|iPhone/i.test(navigator.userAgent)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile, { passive: true })
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current || isShattered || isRespawning || isMobileRef.current)
			return
		const rect = cardRef.current.getBoundingClientRect()
		const maxTilt = 15
		setRotate({
			x:
				(-(e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) *
				maxTilt,
			y:
				((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * maxTilt,
		})
	}

	const handleMouseLeave = () => {
		if (!isShattered && !isRespawning) {
			setIsHovered(false)
			setIsPressed(false)
			setRotate({ x: 0, y: 0 })
		}
	}

	const triggerShatter = (clickX: number, clickY: number, rect: DOMRect) => {
		const cx = Math.max(10, Math.min(90, (clickX / rect.width) * 100))
		const cy = Math.max(10, Math.min(90, (clickY / rect.height) * 100))

		// ОПТИМІЗАЦІЯ: На телефонах робимо 4 промені й 1 кільце (4-6 уламків замість 14-21)
		const isMob = isMobileRef.current
		const numRays = isMob ? 4 : 7
		const numRings = isMob ? 1 : 2
		const baseRadii = isMob ? [0, 140] : [0, 35, 140]
		const points = []

		for (let r = 0; r <= numRings; r++) {
			const ringPoints = []
			for (let i = 0; i < numRays; i++) {
				const angle = (i / numRays) * Math.PI * 2 + (Math.random() - 0.5) * 0.4
				const radius = r === 0 ? 0 : baseRadii[r] + (Math.random() - 0.5) * 10
				ringPoints.push({
					x: cx + Math.cos(angle) * radius,
					y: cy + Math.sin(angle) * radius,
				})
			}
			points.push(ringPoints)
		}

		const newShards = []
		for (let r = 0; r < numRings; r++) {
			for (let i = 0; i < numRays; i++) {
				const p1 = points[r][i],
					p2 = points[r][(i + 1) % numRays],
					p3 = points[r + 1][(i + 1) % numRays],
					p4 = points[r + 1][i]
				const clipPath =
					r === 0
						? `polygon(${p1.x}% ${p1.y}%, ${p3.x}% ${p3.y}%, ${p4.x}% ${p4.y}%)`
						: `polygon(${p1.x}% ${p1.y}%, ${p2.x}% ${p2.y}%, ${p3.x}% ${p3.y}%, ${p4.x}% ${p4.y}%)`
				const midX = (p1.x + p2.x + p3.x + p4.x) / 4,
					midY = (p1.y + p2.y + p3.y + p4.y) / 4
				const dx = midX - cx,
					dy = midY - cy,
					dist = Math.sqrt(dx * dx + dy * dy) || 1
				const burstForce = (100 / (dist + 5)) * (0.6 + Math.random() * 0.4)

				newShards.push({
					id: `${r}-${i}`,
					clipPath,
					tx: (dx / dist) * burstForce * (isMob ? 3 : 4),
					burstY:
						(dy / dist) * burstForce * (isMob ? 3 : 4) -
						(10 + Math.random() * 25),
					tz: isMob ? 0 : (Math.random() - 0.5) * 200, // Вимикаємо складний поглиблений Z на мобільних
					rx: (Math.random() - 0.5) * (isMob ? 360 : 720),
					ry: (Math.random() - 0.5) * (isMob ? 360 : 720),
					rz: (Math.random() - 0.5) * (isMob ? 360 : 720),
				})
			}
		}

		setGeneratedShards(newShards)
		setIsShattered(true)
		setIsPressed(false)
		setRotate({ x: 0, y: 0 })
		setTimeout(() => setCrackGroups([]), 50)
		setTimeout(() => {
			setIsShattered(false)
			setIsRespawning(true)
			setTimeout(() => setIsRespawning(false), 900)
		}, 3200)
	}

	const handleInteractionStart = (
		e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
	) => {
		if (isShattered || isRespawning) return
		if (e.type === 'touchstart') lastTouchRef.current = Date.now()
		else if (e.type === 'mousedown' && Date.now() - lastTouchRef.current < 500)
			return

		setIsPressed(true)
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		const clickX =
			('touches' in e
				? e.touches[0].clientX
				: (e as React.MouseEvent).clientX) - rect.left
		const clickY =
			('touches' in e
				? e.touches[0].clientY
				: (e as React.MouseEvent).clientY) - rect.top

		const isMob = isMobileRef.current
		const newCracks: {
			id: number
			points: string
			width: number
			opacity: number
		}[] = []

		// ОПТИМІЗАЦІЯ: На телефонах малюємо менше мікротріщин
		const microCracksCount = isMob ? 4 : 6
		for (let i = 0; i < microCracksCount; i++)
			newCracks.push({
				id: Math.random(),
				points: `${clickX},${clickY} ${clickX + (Math.random() - 0.5) * 15},${clickY + (Math.random() - 0.5) * 15}`,
				width: 1 + Math.random() * 1.5,
				opacity: 0.8 + Math.random() * 0.2,
			})

		const numMainCracks = isMob
			? 6 + Math.floor(Math.random() * 3)
			: 7 + Math.floor(Math.random() * 6)

		const midPoints: { x: number; y: number }[] = []

		for (let i = 0; i < numMainCracks; i++) {
			let currX = clickX,
				currY = clickY,
				points = `${currX},${currY} `,
				baseAngle =
					(i / numMainCracks) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
			const segments = isMob
					? 4 + Math.floor(Math.random() * 3)
					: 4 + Math.floor(Math.random() * 5),
				width = 0.5 + Math.random() * 0.7
			let midX = currX,
				midY = currY
			for (let j = 0; j < segments; j++) {
				const angle = baseAngle + (Math.random() - 0.5) * 0.8,
					length = 20 + Math.random() * 45
				currX += Math.cos(angle) * length
				currY += Math.sin(angle) * length
				points += `${currX},${currY} `
				if (j === 1) {
					midX = currX
					midY = currY
				}
				// Бранч-тріщини тепер є і на мобільних, але рідше й коротші
				if (Math.random() > (isMob ? 0.65 : 0.4)) {
					let bx = currX,
						by = currY,
						bPoints = `${bx},${by} `,
						bAngle =
							angle +
							(Math.random() > 0.5 ? 1 : -1) *
								(Math.PI / 2.5 + Math.random() * 0.4)
					const bSegments = isMob ? 1 : 1 + Math.floor(Math.random() * 3)
					for (let k = 0; k < bSegments; k++) {
						const bLen = 10 + Math.random() * 25
						bAngle += (Math.random() - 0.5) * 0.6
						bx += Math.cos(bAngle) * bLen
						by += Math.sin(bAngle) * bLen
						bPoints += `${bx},${by} `
					}
					newCracks.push({
						id: Math.random(),
						points: bPoints,
						width: width * 0.6,
						opacity: 0.4 + Math.random() * 0.3,
					})
				}
			}
			midPoints.push({ x: midX, y: midY })
			if (isMob) {
				// м'яке підсвічування під тріщиною — імітує заломлення світла без filter/blur
				newCracks.push({
					id: Math.random(),
					points,
					width: width * 2.4,
					opacity: 0.1 + Math.random() * 0.08,
				})
			}
			newCracks.push({
				id: Math.random(),
				points,
				width,
				opacity: 0.6 + Math.random() * 0.4,
			})
		}

		// Кільцеві (концентричні) тріщини — з'єднують радіальні, головна ознака реального розколу
		const numRings = isMob ? 1 : 2
		for (let r = 0; r < numRings; r++) {
			const scale = 0.4 + r * 0.35
			let ringPoints = ''
			for (let i = 0; i <= midPoints.length; i++) {
				const p = midPoints[i % midPoints.length]
				const rx = clickX + (p.x - clickX) * scale + (Math.random() - 0.5) * 8
				const ry = clickY + (p.y - clickY) * scale + (Math.random() - 0.5) * 8
				ringPoints += `${rx},${ry} `
			}
			newCracks.push({
				id: Math.random(),
				points: ringPoints,
				width: 0.4 + Math.random() * 0.4,
				opacity: 0.35 + Math.random() * 0.25,
			})
		}
		if (isMob) {
			const chipSize = 4 + Math.random() * 3
			let chipPoints = ''
			const chipSides = 5
			for (let i = 0; i < chipSides; i++) {
				const a = (i / chipSides) * Math.PI * 2
				const r = chipSize * (0.6 + Math.random() * 0.6)
				chipPoints += `${clickX + Math.cos(a) * r},${clickY + Math.sin(a) * r} `
			}
			newCracks.push({
				id: Math.random(),
				points: chipPoints,
				width: 0.6,
				opacity: 0.5,
			})
		}

		const groupId = Math.random().toString()
		setCrackGroups(prev => {
			const next = [
				...prev,
				{ id: groupId, cracks: newCracks, isFading: false },
			]
			if (next.length >= 4) {
				triggerShatter(clickX, clickY, rect)
				return []
			}
			return next
		})
		setTimeout(
			() =>
				setCrackGroups(prev =>
					prev.map(g => (g.id === groupId ? { ...g, isFading: true } : g)),
				),
			5000,
		)
		setTimeout(
			() => setCrackGroups(prev => prev.filter(g => g.id !== groupId)),
			6000,
		)
	}

	const renderCardContent = (isShard = false) => (
		<div
			className='flex flex-col items-center text-center relative z-10 w-full h-full justify-center'
			style={
				isShard
					? {}
					: {
							transform: `translateZ(${isPressed && !isRespawning ? '10px' : '30px'})`,
							transition: 'transform 0.15s ease-out',
							transformStyle: 'preserve-3d',
						}
			}
		>
			<Image
				src='/profile.jpg'
				alt='Royce'
				width={144}
				height={144}
				priority={true}
				fetchPriority='high'
				className='w-20 h-20 md:w-36 md:h-36 rounded-full object-cover mb-2 md:mb-3 shadow-lg'
			/>
			<h3
				className='text-base md:text-2xl font-medium text-zinc-900 dark:text-white'
				style={isShard ? {} : { transform: 'translateZ(20px)' }}
			>
				Royce
			</h3>
			<p
				className='text-xs md:text-lg italic text-zinc-700 dark:text-zinc-300 mt-1.5 md:mt-2 leading-relaxed max-w-xs font-serif'
				style={isShard ? {} : { transform: 'translateZ(15px)' }}
			>
				{t.quote.text}
			</p>
			<p
				className='text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed max-w-xs'
				style={isShard ? {} : { transform: 'translateZ(10px)' }}
			>
				{t.quote.sub}
			</p>
			<span
				className='text-[9px] md:text-xs text-zinc-400 dark:text-zinc-500 mt-0.5 md:mt-1 uppercase tracking-wider'
				style={isShard ? {} : { transform: 'translateZ(8px)' }}
			>
				{t.quote.author}
			</span>
		</div>
	)

	return (
		<div
			style={{ perspective: '1000px' }}
			className='w-full max-w-[270px] sm:max-w-xs md:max-w-sm mx-auto relative min-h-[310px] md:min-h-[400px] flex items-center'
		>
			<style
				dangerouslySetInnerHTML={{
					__html: `
                @keyframes realistic-shatter { 0% { transform: translate3d(0, 0, 0) rotate3d(0,0,0,0); opacity: 1; } 15% { transform: translate3d(var(--tx), var(--burst-y), var(--tz)) rotateX(calc(var(--rx) * 0.1)) rotateY(calc(var(--ry) * 0.1)) rotateZ(calc(var(--rz) * 0.1)); opacity: 1; } 80% { opacity: 1; } 100% { transform: translate3d(var(--tx), calc(var(--burst-y) + 600px), var(--tz)) rotateX(var(--rx)) rotateY(var(--ry)) rotateZ(var(--rz)); opacity: 0; } }
                .shard-piece { animation: realistic-shatter 2.8s cubic-bezier(0.25, 1, 0.5, 1) forwards; backface-visibility: hidden; will-change: transform, opacity; }
                @keyframes card-materialize { 0% { transform: scale(0.3) translateY(-150px) rotateX(-45deg); opacity: 0; filter: blur(20px) brightness(2); } 50% { transform: scale(1.05) translateY(10px) rotateX(10deg); opacity: 0.8; filter: blur(5px) brightness(1.2); } 100% { transform: scale(1) translateY(0) rotateX(0); opacity: 1; filter: blur(0) brightness(1); } }
                .respawn-mode { animation: card-materialize 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            `,
				}}
			/>
			<div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => {
					if (!isShattered && !isRespawning) setIsHovered(true)
				}}
				onMouseLeave={handleMouseLeave}
				onMouseDown={handleInteractionStart}
				onMouseUp={() => setIsPressed(false)}
				onTouchStart={handleInteractionStart}
				onTouchEnd={() => setIsPressed(false)}
				style={{
					transform:
						isShattered || isRespawning
							? undefined
							: `rotateX(${isPressed ? rotate.x * 0.6 : rotate.x}deg) rotateY(${isPressed ? rotate.y * 0.6 : rotate.y}deg) scale(${isPressed ? 0.985 : 1})`,
					transition:
						isShattered || isRespawning
							? 'none'
							: isPressed
								? 'transform 0.1s ease-out'
								: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
					transformStyle: 'preserve-3d',
					opacity: isShattered ? 0 : 1,
				}}
				className={`absolute inset-0 bg-white/30 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-4 md:p-8 border border-white/50 dark:border-zinc-700/50 w-full cursor-pointer select-none transition-shadow duration-300 overflow-hidden ${isPressed && !isShattered ? 'shadow-inner' : 'shadow-lg hover:shadow-2xl'} ${isRespawning ? 'respawn-mode' : ''}`}
			>
				{crackGroups.map(group => (
					<svg
						key={group.id}
						className={`absolute inset-0 w-full h-full pointer-events-none z-50 transition-opacity duration-1000 ease-in-out ${group.isFading ? 'opacity-0' : 'opacity-100'}`}
					>
						{group.cracks.map(crack => {
							const isDark = document.documentElement.classList.contains('dark')
							const mobileColor = isDark
								? `rgba(255, 255, 255, ${crack.opacity})`
								: `rgba(30, 30, 35, ${crack.opacity})`

							return (
								<polyline
									key={crack.id}
									points={crack.points}
									fill='none'
									stroke={
										isMobileRef.current
											? mobileColor
											: `rgba(255, 255, 255, ${crack.opacity})`
									}
									strokeWidth={crack.width}
									strokeLinecap='square'
									strokeLinejoin='miter'
									style={{
										filter: isMobileRef.current
											? isDark
												? 'none'
												: 'drop-shadow(0px 0px 1px rgba(255,255,255,0.6))'
											: 'drop-shadow(1px 1px 0px rgba(0,0,0,0.3)) drop-shadow(-1px -1px 0px rgba(255,255,255,0.1))',
									}}
								/>
							)
						})}
					</svg>
				))}
				{renderCardContent(false)}
			</div>
			{isShattered && (
				<div className='absolute inset-0 z-50 pointer-events-none'>
					{generatedShards.map(shard => (
						<div
							key={shard.id}
							// ОПТИМІЗАЦІЯ: На мобільних прибираємо backdrop-blur-xl з уламків, щоб GPU не гальмував
							className='absolute inset-0 shard-piece bg-white/80 dark:bg-zinc-900/90 md:bg-white/30 md:dark:bg-zinc-900/40 md:backdrop-blur-xl border border-white/50 dark:border-zinc-700/50 rounded-3xl p-4 md:p-8'
							style={
								{
									clipPath: shard.clipPath,
									'--tx': `${shard.tx}px`,
									'--burst-y': `${shard.burstY}px`,
									'--tz': `${shard.tz}px`,
									'--rx': `${shard.rx}deg`,
									'--ry': `${shard.ry}deg`,
									'--rz': `${shard.rz}deg`,
								} as React.CSSProperties
							}
						>
							{renderCardContent(true)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
