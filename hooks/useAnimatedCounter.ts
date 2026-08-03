import { useState, useEffect, useRef } from 'react'

export const useAnimatedCounter = (
	target: number,
	duration: number = 1500,
	start: boolean = true,
) => {
	const [count, setCount] = useState(0)
	const frameRef = useRef<number | null>(null)

	useEffect(() => {
		if (!start) return

		const startTime = performance.now()

		const animate = (time: number) => {
			const elapsed = time - startTime
			const progress = Math.min(elapsed / duration, 1)
			const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
			const current = Math.round(eased * target)

			setCount(current)

			if (progress < 1) {
				frameRef.current = requestAnimationFrame(animate)
			} else {
				setCount(target)
			}
		}

		frameRef.current = requestAnimationFrame(animate)

		return () => {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current)
			}
		}
	}, [target, duration, start])

	return count
}
