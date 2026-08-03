import { useState, useEffect } from 'react'

export const useScrollProgress = () => {
	const [scrollProgress, setScrollProgress] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const totalScroll = document.documentElement.scrollTop
			const windowHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight
			setScrollProgress(windowHeight > 0 ? totalScroll / windowHeight : 0)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return scrollProgress
}
