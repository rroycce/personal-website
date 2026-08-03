'use client'

import { useState, useEffect } from 'react'
import { Cookie, X } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

export const CookieConsent = () => {
	const { lang } = useLanguage()
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const consent = localStorage.getItem('cookie_consent_status')
		if (!consent) {
			// Показуємо через 1.5 секунди після завантаження
			const timer = setTimeout(() => setIsVisible(true), 1500)
			return () => clearTimeout(timer)
		}
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookie_consent_status', 'accepted')
		setIsVisible(false)
	}

	const handleDecline = () => {
		localStorage.setItem('cookie_consent_status', 'declined')
		setIsVisible(false)
	}

	if (!isVisible) return null

	return (
		<div className='fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[9000] sm:max-w-sm animate-fade-in-up'>
			<div className='bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col gap-3 sm:gap-4'>
				{/* Шапка з іконкою та кнопкою закриття */}
				<div className='flex items-center justify-between gap-2'>
					<div className='flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium text-sm sm:text-base'>
						<Cookie className='w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0' />
						<span>
							{lang === 'en' ? 'Cookie Notice' : 'Використання Cookie'}
						</span>
					</div>
					<button
						onClick={handleDecline}
						className='text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-1 rounded-lg'
						aria-label='Закрити'
					>
						<X size={16} />
					</button>
				</div>

				{/* Текст повідомлення */}
				<p className='text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans font-light leading-relaxed'>
					{lang === 'en'
						? 'We use cookies to improve your browsing experience and analyze site traffic.'
						: 'Ми використовуємо файли cookie для покращення роботи сайту та аналізу відвідуваності.'}
				</p>

				{/* Кнопки дій (на телефоні — на всю ширину, на ПК — компактні) */}
				<div className='flex items-center gap-2 pt-1'>
					<button
						onClick={handleAccept}
						className='flex-1 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-xs sm:text-sm font-sans font-medium py-2 px-4 rounded-xl transition-all shadow-sm active:scale-95 text-center'
					>
						{lang === 'en' ? 'Accept All' : 'Прийняти'}
					</button>
					<button
						onClick={handleDecline}
						className='flex-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-sans font-medium py-2 px-4 rounded-xl transition-all active:scale-95 text-center'
					>
						{lang === 'en' ? 'Decline' : 'Відхилити'}
					</button>
				</div>
			</div>
		</div>
	)
}
