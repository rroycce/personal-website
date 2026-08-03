import { useState, useEffect, useRef } from 'react'

export const useScrollProgress = () => {
	const [scrollProgress, setScrollProgress] = useState(0)
	const ticking = useRef(false) // Запобігає спаму

	useEffect(() => {
		const handleScroll = () => {
			if (ticking.current) return // Якщо вже чекаємо на відмальовування - пропускаємо
			ticking.current = true

			requestAnimationFrame(() => {
				const totalScroll = document.documentElement.scrollTop
				const windowHeight =
					document.documentElement.scrollHeight -
					document.documentElement.clientHeight
				setScrollProgress(windowHeight > 0 ? totalScroll / windowHeight : 0)
				ticking.current = false
			})
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return scrollProgress
}
