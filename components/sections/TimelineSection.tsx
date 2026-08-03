'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

export const TimelineSection = () => {
	const { t, db } = useLanguage()
	const [activeIndex, setActiveIndex] = useState(0)
	const [direction, setDirection] = useState(1)

	const goTo = (idx: number) => {
		setDirection(idx > activeIndex ? 1 : -1)
		setActiveIndex(idx)
	}

	const progress = (activeIndex / (db.timeline.length - 1)) * 100

	return (
		<section className='relative w-full mb-24 md:mb-32 animate-fade-in-up delay-300 z-10'>
			<div className='text-center mb-10 md:mb-20'>
				<h2 className='section-label text-xl md:text-2xl text-zinc-900 dark:text-zinc-100'>
					{t.path}
				</h2>
			</div>

			<div className='w-full px-4 sm:px-16 md:px-24 mb-4'>
				<div className='relative w-full h-24 md:h-32 mx-auto'>
					{/* Карусельна лінія прогресу */}
					<div className='absolute top-[6px] left-0 right-0 h-[3px] bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-visible'>
						<div className='absolute inset-0 rounded-full overflow-hidden'>
							<div
								className='h-full bg-[length:200%_100%] bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 animate-carousel-flow transition-all duration-700 ease-out'
								style={{ width: `${progress}%` }}
							/>
						</div>
						{/* "комета" на кінці прогресу */}
						<div
							className='absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-300 blur-[3px] opacity-80 transition-all duration-700 ease-out'
							style={{ left: `calc(${progress}% - 6px)` }}
						/>
					</div>

					{db.timeline.map((item: any, idx: number) => (
						<div
							key={idx}
							className='absolute top-0 flex flex-col items-center w-16 sm:w-32 md:w-52 lg:w-60 cursor-pointer group z-10'
							style={{
								left: `${(idx / (db.timeline.length - 1)) * 100}%`,
								transform: 'translateX(-50%)',
							}}
							onClick={() => goTo(idx)}
						>
							<div
								className={`w-4 h-4 md:w-5 md:h-5 rounded-full mb-3 md:mb-4 transition-all duration-500 ${
									idx === activeIndex
										? 'scale-125 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.7)]'
										: 'bg-zinc-300 dark:bg-zinc-600 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-500'
								}`}
							/>
							<div
								className={`flex flex-col items-center gap-0.5 w-full px-1 py-1.5 md:px-3 md:py-2.5 rounded-xl sm:rounded-2xl transition-all duration-300 ${
									idx === activeIndex
										? 'shadow-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 scale-105'
										: 'bg-transparent md:bg-white/80 md:dark:bg-zinc-800/90 md:border md:border-zinc-200/60 md:dark:border-zinc-700/60 md:shadow-sm md:hover:bg-white md:dark:hover:bg-zinc-800'
								}`}
							>
								{/* Назва: на мобільних лише для активної, на md+ завжди */}
								<span
									className={`${
										idx === activeIndex ? 'block' : 'hidden md:block'
									} text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-sans uppercase tracking-widest truncate w-full text-center ${
										idx === activeIndex
											? 'font-semibold'
											: 'font-medium text-zinc-700 dark:text-zinc-200'
									}`}
								>
									{item.title}
								</span>
								{/* Рік: завжди видно, менший на неактивних мобільних */}
								<span
									className={`font-sans tracking-wide truncate w-full text-center ${
										idx === activeIndex
											? 'text-[8px] sm:text-[9px] md:text-xs text-white/70 dark:text-zinc-900/60'
											: 'text-[7px] sm:text-[9px] md:text-xs text-zinc-400 dark:text-zinc-500'
									}`}
								>
									{item.year}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div
				className='relative max-w-2xl mx-auto px-4'
			>
				<div
					key={activeIndex}
					className='bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-10 border border-zinc-200 dark:border-zinc-700 shadow-sm text-center flex flex-col items-center animate-card-flip'
					style={{
						['--flip-dir' as any]: direction,
						transformStyle: 'preserve-3d',
					}}
				>
					<span className='inline-block px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] md:text-xs font-sans uppercase tracking-widest font-medium mb-3 md:mb-4'>
						{db.timeline[activeIndex].role}
					</span>

					<div className='inline-flex flex-col items-center mb-4 md:mb-6'>
						<h3 className='text-xl sm:text-2xl md:text-4xl font-medium text-zinc-900 dark:text-white pb-2'>
							{db.timeline[activeIndex].title}
						</h3>
						<span className='w-full h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full' />
					</div>

					<p className='text-zinc-600 dark:text-zinc-400 font-sans font-light leading-relaxed text-sm sm:text-base md:text-lg max-w-xl mx-auto'>
						{db.timeline[activeIndex].desc}
					</p>
				</div>
			</div>

			<div className='flex justify-center items-center gap-6 mt-6 md:mt-8'>
				<button
					onClick={() => goTo(Math.max(0, activeIndex - 1))}
					disabled={activeIndex === 0}
					className='flex w-11 h-11 md:w-14 md:h-14 rounded-full border border-zinc-200 dark:border-zinc-700 items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all disabled:opacity-20 disabled:hover:translate-y-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm shadow-sm'
				>
					<ChevronLeft className='w-5 h-5 md:w-6 md:h-6' />
				</button>
				<button
					onClick={() =>
						goTo(Math.min(db.timeline.length - 1, activeIndex + 1))
					}
					disabled={activeIndex === db.timeline.length - 1}
					className='flex w-11 h-11 md:w-14 md:h-14 rounded-full border border-zinc-200 dark:border-zinc-700 items-center justify-center text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:-translate-y-0.5 hover:shadow-md active:scale-95 transition-all disabled:opacity-20 disabled:hover:translate-y-0 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm shadow-sm'
				>
					<ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
				</button>
			</div>
		</section>
	)
}
