'use client'

import { useState, useEffect } from 'react'
import { Coffee } from 'lucide-react'

export const CoffeeButton = () => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const handleScroll = () => setVisible(window.scrollY > 400)
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<a
			href='https://ko-fi.com/roycedeveloper'
			target='_blank'
			rel='noopener noreferrer'
			className={`fixed bottom-8 left-8 z-40 w-12 h-12 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-lg flex items-center justify-center text-amber-500 hover:scale-110 hover:shadow-xl transition-all duration-300 ${
				visible
					? 'opacity-100 translate-y-0 pointer-events-auto'
					: 'opacity-0 translate-y-4 pointer-events-none'
			}`}
			title='Buy me a coffee'
		>
			<Coffee size={20} />
		</a>
	)
}
