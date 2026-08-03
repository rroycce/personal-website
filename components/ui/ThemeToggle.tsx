'use client'

import { Sun, Moon } from 'lucide-react'

export const ThemeToggle = ({
	darkMode,
	setDarkMode,
}: {
	darkMode: boolean
	setDarkMode: (v: boolean) => void
}) => (
	<button
		type='button'
		onClick={() => setDarkMode(!darkMode)}
		className='copycase-switch'
		title='Змінити тему'
	>
		<Sun className='icon-sun' size={18} />
		<span className='copycase-btn-switch' />
		<Moon className='icon-moon' size={18} />
	</button>
)
