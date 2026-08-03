'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export const BackToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggle = () => setIsVisible(window.scrollY > 500)
		window.addEventListener('scroll', toggle)
		return () => window.removeEventListener('scroll', toggle)
	}, [])

	return (
		<button
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			className={`fixed bottom-6 right-6 z-[9800] p-3.5 rounded-full bg-white/70 dark:bg-zinc-800/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-lg text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 hover:border-emerald-200 dark:hover:border-emerald-500 transition-all duration-300 group ${
				isVisible
					? 'opacity-100 translate-y-0 scale-100'
					: 'opacity-0 translate-y-10 scale-90 pointer-events-none'
			}`}
		>
			<ArrowUp
				size={20}
				className='group-hover:-translate-y-1 transition-transform'
			/>
		</button>
	)
}
