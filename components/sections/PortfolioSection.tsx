'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Code, Play, X } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { createPortal } from 'react-dom'

export const PortfolioSection = () => {
	const { t, db, lang } = useLanguage()
	const [activeCategory, setActiveCategory] = useState(db.categories[0])
	const [flippedCardId, setFlippedCardId] = useState<number | null>(null)
	const [demoUrl, setDemoUrl] = useState<string | null>(null)
	const [demoTitle, setDemoTitle] = useState<string>('')

	// Блокуємо скрол сайту, коли відкрита демка
	useEffect(() => {
		if (demoUrl) {
			document.documentElement.style.overflow = 'hidden'
			document.body.style.overflow = 'hidden'
		} else {
			document.documentElement.style.overflow = ''
			document.body.style.overflow = ''
		}
		return () => {
			document.documentElement.style.overflow = ''
			document.body.style.overflow = ''
		}
	}, [demoUrl])

	useEffect(() => {
		setActiveCategory(db.categories[0])
	}, [db.categories])

	const filteredProjects = db.projects.filter(
		p => activeCategory === db.categories[0] || p.category === activeCategory,
	)

	return (
		<section id='portfolio' className='relative w-full mb-20 scroll-mt-24'>
			<div className='mb-8 md:mb-10 animate-fade-in-up'>
				<div className='text-center mb-6'>
					<h2 className='section-label text-xl md:text-2xl text-zinc-900 dark:text-zinc-100'>
						{t.portfolio}
					</h2>
				</div>
				<div className='w-full overflow-x-auto no-scrollbar pb-2 -mx-2 px-2 md:mx-0 md:px-0 md:pb-0'>
					<div className='flex gap-2 w-max md:w-auto md:flex-wrap md:justify-center'>
						{db.categories.map(category => (
							<button
								key={category}
								onClick={() => setActiveCategory(category)}
								className={`px-4 py-2 rounded-full text-[10px] md:text-xs font-sans uppercase tracking-wider transition-all duration-300 ${
									activeCategory === category
										? 'bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-md'
										: 'bg-white/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-700 hover:text-zinc-800 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-700'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</div>

			<div className='flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto no-scrollbar py-4 -my-4 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth'>
				{filteredProjects.map((project, index) => (
					<div
						key={project.id}
						className='flip-card animate-fade-in-up shrink-0 w-[240px] sm:w-[270px] md:w-auto h-[260px] md:h-80 group cursor-pointer'
						onClick={() =>
							setFlippedCardId(prev =>
								prev === project.id ? null : project.id,
							)
						}
						style={{ animationDelay: `${100 + index * 100}ms` }}
					>
						<div
							className={`flip-card-inner ${flippedCardId === project.id ? '[transform:rotateY(180deg)]' : ''}`}
						>
							{/* ЛИЦЕВА СТОРОНА */}
							<div className='flip-card-front bg-white/95 dark:bg-zinc-800/95 rounded-3xl p-4 sm:p-5 md:p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm flex flex-col transition-transform duration-300 group-hover:scale-[1.02]'>
								<div className='flex justify-end items-start'>
									<span
										className={`px-2.5 py-0.5 md:px-3 md:py-1 rounded-full ${project.badgeBg} ${project.badgeText} text-[8px] md:text-[10px] font-sans uppercase tracking-widest`}
									>
										{project.category}
									</span>
								</div>
								<h3 className='text-lg sm:text-xl md:text-2xl font-medium text-zinc-900 dark:text-zinc-100 text-left mt-1 md:mt-2 mb-1 md:mb-2'>
									{project.title}
								</h3>
								<div className='flex-1 flex items-center justify-center my-2 md:my-3'>
									{project.logo ? (
										<div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg ring-2 ring-white/20 ring-offset-2 ring-offset-zinc-200 dark:ring-offset-zinc-800 flex-shrink-0'>
											<Image
												src={project.logo}
												alt={project.title}
												width={112}
												height={112}
												className='w-full h-full object-cover'
											/>
										</div>
									) : (
										<div className='w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-400 dark:text-zinc-500 text-2xl md:text-3xl font-medium'>
											{project.title.charAt(0)}
										</div>
									)}
								</div>
								<div className='flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-[9px] md:text-xs font-sans uppercase tracking-widest mt-auto'>
									<ArrowUpRight size={13} />
									<span className='truncate'>
										{lang === 'en'
											? 'CLICK TO LEARN MORE'
											: 'НАТИСНІТЬ, ЩОБ ДІЗНАТИСЬ БІЛЬШЕ'}
									</span>
								</div>
							</div>

							{/* ЗВОРОТНА СТОРОНА */}
							<div
								className={`flip-card-back bg-gradient-to-br ${project.colorFrom} ${project.colorTo} rounded-3xl p-4 sm:p-5 md:p-8 flex flex-col justify-between text-white shadow-xl`}
							>
								<p className='font-sans font-light text-[11px] sm:text-xs md:text-base leading-relaxed line-clamp-4 md:line-clamp-none'>
									{project.desc}
								</p>
								<div>
									<div className='flex flex-wrap gap-1.5 font-sans text-[8px] md:text-[10px] uppercase tracking-wider font-medium mt-2 mb-3'>
										{project.tech.map(tech => (
											<span
												key={tech}
												className='px-2 py-0.5 md:px-3 md:py-1.5 rounded-full bg-black/20 backdrop-blur-sm'
											>
												{tech}
											</span>
										))}
									</div>

									<div className='flex flex-wrap gap-2'>
										{/* Кнопка "Деталі" */}
										<Link
											href={`/projects/${project.id}`}
											onClick={e => e.stopPropagation()}
											className='inline-flex items-center gap-1.5 text-[9px] md:text-xs font-sans uppercase tracking-widest bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors'
										>
											<ArrowUpRight size={12} />
											Деталі
										</Link>

										{/* "ДЕМО" */}
										{(project as any).demo && (
											<button
												onClick={e => {
													e.stopPropagation()

													// Перевірка ліміту для Horizon (id: 5)
													if (project.id === 5) {
														const today = new Date().toDateString()
														const savedDate =
															localStorage.getItem('horizon_play_date')
														let count = parseInt(
															localStorage.getItem('horizon_play_count') || '0',
														)

														// Якщо наступив новий день — скидаємо лічильник
														if (savedDate !== today) {
															count = 0
															localStorage.setItem('horizon_play_date', today)
														}

														// Якщо вичерпано ліміт у 3 ігри
														if (count >= 3) {
															alert(
																lang === 'en'
																	? 'You have reached the limit of 3 demo plays for today! Try again tomorrow.'
																	: 'Ви використали ліміт 3 ігор на сьогодні! Спробуйте завтра.',
															)
															return
														}

														// Збільшуємо лічильник і зберігаємо
														localStorage.setItem(
															'horizon_play_count',
															(count + 1).toString(),
														)
													}

													setDemoUrl((project as any).demo)
													setDemoTitle(project.title)
												}}
												className='inline-flex items-center gap-1.5 text-[9px] md:text-xs font-sans uppercase tracking-widest bg-emerald-500/80 hover:bg-emerald-500 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors text-white font-medium shadow-sm'
											>
												<Play size={11} className='fill-current' />
												{lang === 'en' ? 'Demo' : 'Демо'}
											</button>
										)}

										{/* Кнопка GitHub */}
										{(project as any).github && (
											<a
												href={(project as any).github}
												target='_blank'
												rel='noopener noreferrer'
												onClick={e => e.stopPropagation()}
												className='inline-flex items-center gap-1.5 text-[9px] md:text-xs font-sans uppercase tracking-widest bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-colors'
											>
												<Code size={12} />
												GitHub
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Виправлене модальне вікно для Live Demo */}
			{demoUrl &&
				typeof window !== 'undefined' &&
				createPortal(
					<div
						className='fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in p-4 sm:p-6'
						onClick={() => setDemoUrl(null)}
					>
						<div
							className='relative w-full max-w-6xl h-[85vh] sm:h-[90vh] bg-zinc-950 rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col my-auto'
							onClick={e => e.stopPropagation()}
						>
							<button
								onClick={() => setDemoUrl(null)}
								className='absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer'
								aria-label='Закрити демо'
							>
								<X size={18} />
							</button>

							<div className='relative w-full h-full flex-1 overflow-hidden bg-zinc-950'>
								<iframe
									src={demoUrl}
									className='w-full h-full border-0 block'
									title='Live Preview'
									sandbox='allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox'
									loading='lazy'
								/>
							</div>
						</div>
					</div>,
					document.body,
				)}
		</section>
	)
}
