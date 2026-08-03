import { useState } from 'react'

export const useRipples = () => {
	const [ripples, setRipples] = useState<
		{ x: number; y: number; id: number }[]
	>([])

	const addRipple = (e: React.MouseEvent<HTMLElement>) => {
		const id = Date.now()
		setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id }])
		setTimeout(() => {
			setRipples(prev => prev.filter(r => r.id !== id))
		}, 1000)
	}

	return { ripples, addRipple }
}
