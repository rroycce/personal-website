'use client'

import { useRef, useEffect } from 'react'

export const SplashCanvas = ({
	splash,
	splashOpacity,
	setSplash,
	setSplashOpacity,
}: {
	splash: boolean
	splashOpacity: number
	setSplash: (v: boolean) => void
	setSplashOpacity: (v: number) => void
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		if (!splash) return
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d', { willReadFrequently: true })
		if (!ctx) return

		let isFading = false

		const initCanvas = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			ctx.globalCompositeOperation = 'source-over'
			ctx.fillStyle = '#fdfdfd'
			ctx.fillRect(0, 0, canvas.width, canvas.height)
			ctx.fillStyle = '#059669'
			ctx.font = 'bold 24px monospace'
			ctx.textAlign = 'center'
			ctx.textBaseline = 'middle'
			ctx.fillText('> system.init()', canvas.width / 2, canvas.height / 2 - 20)
			ctx.fillStyle = '#71717a'
			ctx.font = '16px sans-serif'
			ctx.fillText(
				'Стирайте екран мишкою або пальцем...',
				canvas.width / 2,
				canvas.height / 2 + 20,
			)
			ctx.globalCompositeOperation = 'destination-out'
		}

		initCanvas()

		const checkErased = () => {
			if (isFading) return
			const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
			let trans = 0
			const stride = 32 * 4
			for (let i = 3; i < data.length; i += stride) {
				if (data[i] === 0) trans++
			}
			if (trans / (data.length / stride) > 0.99) {
				isFading = true
				setSplashOpacity(0)
				if (canvasRef.current) {
					canvasRef.current.style.transition =
						'transform 1s cubic-bezier(0.16,1,0.3,1), opacity 1s ease'
					canvasRef.current.style.transform = 'scale(1.05)'
				}
				setTimeout(() => setSplash(false), 1000)
			}
		}

		let timer: NodeJS.Timeout | null = null
		const draw = (e: MouseEvent | TouchEvent) => {
			if (isFading) return
			const x = 'touches' in e ? e.touches[0].clientX : e.clientX
			const y = 'touches' in e ? e.touches[0].clientY : e.clientY
			ctx.beginPath()
			ctx.arc(x, y, 250, 0, Math.PI * 2)
			ctx.fill()
			if (!timer) {
				timer = setTimeout(() => {
					checkErased()
					timer = null
				}, 150)
			}
		}

		canvas.addEventListener('mousemove', draw)
		canvas.addEventListener('touchmove', draw, { passive: true })
		window.addEventListener('resize', initCanvas)

		return () => {
			canvas.removeEventListener('mousemove', draw)
			canvas.removeEventListener('touchmove', draw)
			window.removeEventListener('resize', initCanvas)
			if (timer) clearTimeout(timer)
		}
	}, [splash, setSplash, setSplashOpacity])

	if (!splash) return null

	return (
		<div
			className={`fixed inset-0 z-[999] transition-opacity duration-1000 ease-in-out ${
				splashOpacity === 0 ? 'pointer-events-none' : ''
			}`}
			style={{ opacity: splashOpacity }}
		>
			<canvas
				ref={canvasRef}
				className='absolute inset-0 w-full h-full cursor-crosshair'
				aria-hidden='true'
			/>
		</div>
	)
}
