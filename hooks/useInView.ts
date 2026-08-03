import { useEffect, useRef, useState } from 'react'

export const useInView = (options?: IntersectionObserverInit) => {
	const ref = useRef<HTMLElement | null>(null)
	const [isInView, setIsInView] = useState(false)

	useEffect(() => {
		const currentRef = ref.current
		if (!currentRef) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true)
					// Якщо потрібно, щоб анімація спрацьовувала тільки один раз:
					// observer.unobserve(currentRef);
				}
			},
			{
				threshold: 0.1,
				...options,
			},
		)

		observer.observe(currentRef)

		return () => {
			if (currentRef) observer.unobserve(currentRef)
		}
	}, [options])

	return { ref, isInView }
}
