'use client'

import { useLanguage } from '@/components/providers/LanguageProvider'

export const PrinciplesSection = () => {
	const { t, db } = useLanguage()
	return (
		<section className='relative w-full mb-20 sm:mb-24 md:mb-32 animate-fade-in-up delay-400'>
			<div className='text-center mb-6 sm:mb-10 md:mb-16'>
				<h2 className='section-label text-xl md:text-2xl text-zinc-900 dark:text-zinc-100'>
					{t.principles}
				</h2>
			</div>
			{/* Зменшили відстань між картками на телефонах до gap-3 */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8 lg:gap-10 relative'>
				{db.principles.map((step, idx) => (
					<div
						key={idx}
						className='relative z-10 group bg-white/40 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'
					>
						{/* Компактний номер на телефонах (text-2xl) з меншим відступом знизу (mb-1.5) */}
						<div className='text-2xl sm:text-4xl md:text-5xl font-serif text-zinc-300 dark:text-zinc-600 mb-1.5 sm:mb-4 md:mb-5 transition-colors group-hover:text-cyan-400'>
							{step.num}
						</div>
						{/* Акуратний заголовок та менші відступи */}
						<h3 className='text-base sm:text-lg md:text-xl font-medium text-zinc-800 dark:text-white mb-1 md:mb-3'>
							{step.title}
						</h3>
						{/* Зібраний текст з акуратним міжрядковим інтервалом */}
						<p className='text-xs sm:text-sm md:text-base font-sans font-light text-zinc-500 dark:text-zinc-400 leading-normal md:leading-relaxed'>
							{step.desc}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
