'use client'

import { useState, useEffect } from 'react'
import { Wifi } from 'lucide-react'

export const SpeedWidget = () => {
	const [ping, setPing] = useState<number | null>(null)
	const [speed, setSpeed] = useState<number | null>(null)
	const [location, setLocation] = useState<{ ip: string; city: string } | null>(
		null,
	)

	// Отримуємо IP та місто
	useEffect(() => {
		let cancelled = false
		fetch('https://ipapi.co/json/')
			.then(res => res.json())
			.then(data => {
				if (!cancelled) {
					setLocation({
						ip: data.ip || '—',
						city: [data.city, data.country_name].filter(Boolean).join(', '),
					})
				}
			})
			.catch(() => {})
		return () => {
			cancelled = true
		}
	}, [])

	// Вимірювання ping та швидкості – ТІЛЬКИ favicon.ico
	useEffect(() => {
		let cancelled = false

		const measure = async () => {
			try {
				// Ping (HEAD-запит до favicon – не завантажує тіло)
				const pingStart = performance.now()
				await fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store' })
				const pingMs = performance.now() - pingStart

				// Швидкість (GET-запит до favicon – завантажує ~1-2 кБ)
				const speedStart = performance.now()
				const res = await fetch('/favicon.ico', { cache: 'no-store' })
				const blob = await res.blob()
				const seconds = (performance.now() - speedStart) / 1000
				const mbps = (blob.size * 8) / seconds / 1_000_000

				if (!cancelled) {
					setPing(Math.round(pingMs))
					setSpeed(Math.max(1, Math.round(mbps)))
				}
			} catch {
				// мовчазний фейл
			}
		}

		measure()
		const interval = setInterval(measure, 8000)

		return () => {
			cancelled = true
			clearInterval(interval)
		}
	}, [])

	if (ping === null || speed === null) return null

	return (
		<div className='flex flex-col items-center md:items-start gap-1.5 w-max mx-auto md:mx-0'>
			<div className='flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 backdrop-blur-md text-xs font-sans text-zinc-500 dark:text-zinc-400 shadow-sm cursor-default hover:border-emerald-500/50 transition-colors'>
				<span className='relative flex h-2 w-2'>
					<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
					<span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500'></span>
				</span>
				<span className='font-medium'>Ping: {ping}ms</span>
				<span className='w-[1px] h-3 bg-zinc-300 dark:bg-zinc-700'></span>
				<span className='flex items-center gap-1.5 font-medium'>
					<Wifi
						size={14}
						className={speed > 5 ? 'text-emerald-500' : 'text-amber-500'}
					/>{' '}
					{speed} Mbps
				</span>
			</div>
			{location && (
				<span className='text-[10px] font-sans text-zinc-400 dark:text-zinc-500 px-1'>
					{location.ip} · {location.city}
				</span>
			)}
		</div>
	)
}
