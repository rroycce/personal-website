'use client'

import { useState } from 'react'
import { Copy, Check, Code, Camera, Globe, Send } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { SpeedWidget } from '@/components/ui/SpeedWidget'

export const FooterSection = () => {
	const { t } = useLanguage()
	const [copied, setCopied] = useState(false)

	const handleCopyEmail = () => {
		navigator.clipboard.writeText('commercialdevr@gmail.com')
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<footer className='mt-16 md:mt-20 pt-6 md:pt-10 border-t border-zinc-200 dark:border-zinc-800 animate-fade-in-up relative pb-8 md:pb-10'>
			<div className='flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-8 font-sans text-sm text-center md:text-left relative z-20'>
				<div className='flex flex-col gap-3.5 md:gap-4 order-2 md:order-1 items-center md:items-start'>
					<SpeedWidget />
					<div className='text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 transition-colors cursor-default text-xs sm:text-sm'>
						{t.footer}
					</div>
				</div>

				{/* На телефонах: іконка зверху, маленький підпис (10px) знизу. На ПК: в один рядок */}
				<div className='flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 order-1 md:order-2 mb-2 md:mb-0'>
					<a
						href='https://github.com/rroycce'
						target='_blank'
						rel='noopener noreferrer'
						className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-1 md:p-0 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:-translate-y-1'
					>
						<Code
							size={18}
							className='group-hover:text-zinc-900 transition-transform group-hover:rotate-12'
						/>
						<span className='text-[10px] sm:text-sm font-medium tracking-wide sm:tracking-normal relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:bg-zinc-900 after:transition-transform after:duration-300'>
							GitHub
						</span>
					</a>

					<a
						href='https://www.instagram.com/site.crm.bot_developer?igsh=MTZ5MTAyMzdqanUxZw=='
						target='_blank'
						rel='noopener noreferrer'
						className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-1 md:p-0 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:-translate-y-1'
					>
						<Camera
							size={18}
							className='group-hover:text-rose-500 transition-transform group-hover:scale-110'
						/>
						<span className='text-[10px] sm:text-sm font-medium tracking-wide sm:tracking-normal relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:bg-rose-500 after:transition-transform after:duration-300'>
							Instagram
						</span>
					</a>

					<a
						href='https://www.facebook.com/share/1DRfky7c5z/'
						target='_blank'
						rel='noopener noreferrer'
						className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-1 md:p-0 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:-translate-y-1'
					>
						<Globe
							size={18}
							className='group-hover:text-blue-600 transition-transform group-hover:-rotate-12'
						/>
						<span className='text-[10px] sm:text-sm font-medium tracking-wide sm:tracking-normal relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:bg-blue-600 after:transition-transform after:duration-300'>
							Facebook
						</span>
					</a>

					<a
						href='https://t.me/a_posteriorii'
						target='_blank'
						rel='noopener noreferrer'
						className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-1 md:p-0 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:-translate-y-1'
					>
						<Send
							size={18}
							className='group-hover:text-cyan-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
						/>
						<span className='text-[10px] sm:text-sm font-medium tracking-wide sm:tracking-normal relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:bg-cyan-500 after:transition-transform after:duration-300'>
							Telegram
						</span>
					</a>

					<button
						onClick={handleCopyEmail}
						className='group flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-1 md:p-0 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:-translate-y-1 active:scale-95'
					>
						{copied ? (
							<Check size={18} className='text-emerald-500' />
						) : (
							<Copy
								size={18}
								className='group-hover:text-emerald-500 transition-transform group-hover:scale-110'
							/>
						)}
						<span className='text-[10px] sm:text-sm font-medium tracking-wide sm:tracking-normal relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:bg-emerald-500 after:transition-transform after:duration-300'>
							{copied ? 'Скопійовано' : 'Email'}
						</span>
					</button>
				</div>
			</div>

			<div
				className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 font-sans text-sm font-medium transition-all duration-400 z-[9999] border border-zinc-700 w-max max-w-[90vw] ${
					copied
						? 'opacity-100 translate-y-0 scale-100'
						: 'opacity-0 translate-y-10 scale-95 pointer-events-none'
				}`}
			>
				<div className='bg-emerald-500/20 p-1 rounded-full shrink-0'>
					<Check size={16} className='text-emerald-400' />
				</div>
				{t.copied}
			</div>
		</footer>
	)
}
