'use client'

import { useState, useEffect } from 'react'
import { HelpCircle, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

export const FAQModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean
	onClose: () => void
}) => {
	const { t, db } = useLanguage()
	const [activeIndex, setActiveIndex] = useState<number | null>(0)

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset'
	}, [isOpen])

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300'
			onClick={onClose}
		>
			<div
				className='bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-3xl w-full max-w-2xl border border-zinc-200 dark:border-zinc-700 shadow-2xl flex flex-col max-h-[85vh] animate-fade-in-up'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex justify-between items-center p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800 shrink-0'>
					<h2 className='text-xl sm:text-2xl font-serif text-zinc-900 dark:text-white flex items-center gap-3'>
						<HelpCircle className='text-emerald-500' /> {t.faq}
					</h2>
					<button
						onClick={onClose}
						className='p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
					>
						<X size={20} />
					</button>
				</div>
				<div className='p-6 sm:p-8 overflow-y-auto flex flex-col gap-4'>
					{db.faq.map((item, idx) => {
						const isOpenItem = activeIndex === idx
						return (
							<div
								key={idx}
								className={`border rounded-2xl transition-colors duration-300 ${
									isOpenItem
										? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-900/10'
										: 'border-zinc-200 dark:border-zinc-800'
								}`}
							>
								<button
									onClick={() => setActiveIndex(isOpenItem ? null : idx)}
									className='w-full flex justify-between items-center p-5 text-left'
								>
									<span className='font-medium text-sm sm:text-base text-zinc-800 dark:text-zinc-200 pr-4'>
										{item.q}
									</span>
									<ChevronDown
										size={18}
										className={`text-zinc-400 transition-transform duration-300 shrink-0 ${
											isOpenItem ? 'rotate-180 text-emerald-500' : ''
										}`}
									/>
								</button>

								{/* Плавна анімація висоти за допомогою CSS Grid */}
								<div
									className={`grid transition-all duration-300 ease-in-out ${
										isOpenItem
											? 'grid-rows-[1fr] opacity-100'
											: 'grid-rows-[0fr] opacity-0'
									}`}
								>
									<div className='overflow-hidden'>
										<div className='px-5 pb-5 font-sans font-light text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed'>
											{item.a}
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
