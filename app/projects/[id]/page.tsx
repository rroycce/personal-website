'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PROJECTS_DATA } from '@/lib/projects'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import { TrainAnimation } from '@/components/ui/TrainAnimation'
import {
	LanguageProvider,
	useLanguage,
} from '@/components/providers/LanguageProvider'
import { ThemeToggle, LangToggle } from '@/components'

export default function ProjectPage() {
	return (
		<LanguageProvider>
			<ProjectPageContent />
		</LanguageProvider>
	)
}

function ProjectPageContent() {
	const { id } = useParams<{ id: string }>()

	// Отримуємо поточну мову (використовуємо 'lang', бо ти так назвав змінну в хуку)
	const { lang } = useLanguage()
	const isEng = lang === 'en' // Допоміжна змінна для зручності

	const [darkMode, setDarkMode] = useState(false)
	const [lightbox, setLightbox] = useState<string | null>(null)

	useEffect(() => {
		const saved = localStorage.getItem('darkMode')
		if (saved) setDarkMode(saved === 'true')
	}, [])

	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
		localStorage.setItem('darkMode', String(darkMode))
	}, [darkMode])

	const project = PROJECTS_DATA[lang].find(p => p.id === Number(id))
	console.log('Project logo:', project?.logo)
	console.log('Project data:', project)
	if (!project) return notFound()

	return (
		<main className='min-h-screen bg-[#Fbfbf9] dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-serif overflow-x-clip selection:bg-emerald-100 selection:text-emerald-900 transition-colors duration-500'>
			<div className='fixed top-6 right-6 z-30 flex items-center gap-2'>
				<LangToggle />
				<ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
			</div>

			<div className='max-w-3xl lg:max-w-none mx-auto px-6 py-16 md:py-24 lg:px-12 xl:px-20 relative z-10'>
				<div className='mt-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-16'>
					{/* Ліва колонка – інформація про проєкт */}
					<div className='lg:sticky lg:top-16 lg:self-start z-20 lg:bg-[#Fbfbf9]/90 lg:dark:bg-zinc-900/90 lg:backdrop-blur-sm lg:pb-4 animate-fade-in-up delay-100'>
						<Link
							href='/'
							className='group inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-zinc-400 hover:text-zinc-800 dark:hover:text-white transition-colors mb-6'
						>
							<ArrowLeft
								size={14}
								className='group-hover:-translate-x-1 transition-transform'
							/>
							{/* Переклад кнопки назад */}
							{isEng ? 'Back to portfolio' : 'Назад до портфоліо'}
						</Link>
						<div
							className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-lg ${
								project.logo
									? ''
									: `bg-gradient-to-br ${project.colorFrom} ${project.colorTo} flex items-center justify-center text-3xl md:text-4xl`
							}`}
						>
							{project.logo ? (
								<img
									src={project.logo}
									alt={project.title}
									className='w-full h-full object-cover rounded-full'
								/>
							) : (
								project.icon
							)}
						</div>
						<div className='mt-5'>
							<div className='flex items-center gap-3 mb-1'>
								<span className='font-sans text-xs text-zinc-400'>
									{project.year}
								</span>
								<span
									className={`px-3 py-1 rounded-full ${project.badgeBg} ${project.badgeText} text-[10px] font-sans uppercase tracking-widest`}
								>
									{project.category}
								</span>
							</div>
							<h1 className='text-3xl lg:text-4xl font-medium text-zinc-900 dark:text-white leading-tight'>
								{project.title}
							</h1>
							{project.hook && (
								<p className='mt-4 text-base lg:text-lg italic text-zinc-500 dark:text-zinc-400 font-serif'>
									{project.hook}
								</p>
							)}
							<div className='flex flex-wrap gap-2 mt-6'>
								{project.tech.map(t => (
									<span
										key={t}
										className={`px-3 py-1.5 rounded-full ${project.badgeBg} ${project.badgeText} text-xs font-sans uppercase tracking-widest`}
									>
										{t}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Права колонка – опис + галерея + навчальна примітка */}
					<div className='bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-zinc-200 dark:border-zinc-700 shadow-sm animate-fade-in-up delay-300'>
						{/* Потяг – тільки для UZ Ticket Hunter */}
						{project.id === 1 && <TrainAnimation />}

						<p className='text-base md:text-lg leading-relaxed font-sans font-light text-zinc-600 dark:text-zinc-400'>
							{project.desc}
						</p>

						{project.features && (
							<div className='mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-700'>
								{/* Переклад заголовка */}
								<h2 className='section-label text-lg text-zinc-900 dark:text-zinc-100 mb-6'>
									{isEng ? 'Key Features' : 'Ключові можливості'}
								</h2>
								<ul className='flex flex-col gap-4'>
									{project.features.map((f, i) => (
										<li
											key={i}
											className='flex items-start gap-3 text-zinc-600 dark:text-zinc-400 font-sans font-light leading-relaxed'
										>
											<span
												className={`shrink-0 w-5 h-5 rounded-full ${project.badgeBg} ${project.badgeText} flex items-center justify-center mt-0.5`}
											>
												<Check size={12} strokeWidth={3} />
											</span>
											{f}
										</li>
									))}
								</ul>
							</div>
						)}

						{project.gallery && (
							<div className='mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-700 flex flex-col gap-8'>
								{project.gallery.map((item, i) => (
									<div
										key={i}
										className={`flex flex-col md:flex-row items-center gap-6 ${
											i % 2 === 1 ? 'md:flex-row-reverse' : ''
										}`}
									>
										{item.image ? (
											<button
												onClick={() => setLightbox(item.image!)}
												className='w-auto max-w-full md:max-w-[45%] mx-auto shrink-0 rounded-2xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-700 cursor-zoom-in transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 inline-block'
											>
												<img
													src={item.image}
													alt={item.caption}
													className='block w-full h-auto max-h-72 md:max-h-80 md:w-auto object-contain mx-auto'
												/>
											</button>
										) : (
											<div className='w-full md:w-2/5 aspect-video rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center shrink-0'>
												<span className='text-xs font-sans uppercase tracking-widest text-zinc-400'>
													{isEng ? 'Photo' : 'Фото'}
												</span>
											</div>
										)}
										<p className='w-full md:w-3/5 text-sm md:text-base font-sans font-light text-zinc-500 dark:text-zinc-400 leading-relaxed text-center md:text-left'>
											{item.caption}
										</p>
									</div>
								))}

								{/* 🔹 Примітка для навчального проєкту – тільки для id=1 */}
								{project.id === 1 && (
									<div className='mt-2 pt-4 border-t border-zinc-200 dark:border-zinc-700'>
										<p className='text-sm font-sans font-light text-zinc-500 dark:text-zinc-400 italic'>
											{isEng
												? '⚠️ This bot was developed exclusively for educational purposes to improve programming skills, API integration, web scraping, and automation. It is not used for commercial, inappropriate, or any other purposes that violate the current legislation of Ukraine. The bot does not collect, process, store, or transmit any personal data of users or third parties. All data, images, and screenshots presented on this page were obtained exclusively in a test environment from publicly available sources and are used solely to illustrate functionality.'
												: '⚠️ Цей бот розроблений виключно в навчальних цілях для покращення навичок програмування, роботи з API, веб-скрапінгу та автоматизації. Він не використовується в комерційних, нецільових або будь-яких інших цілях, що порушують чинне законодавство України. Бот не збирає, не обробляє, не зберігає та не передає жодних персональних даних користувачів або третіх осіб. Усі дані, зображення та скріншоти, наведені на цій сторінці, отримані виключно в тестовому середовищі з публічно доступних джерел і використовуються лише для ілюстрації функціоналу.'}
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			{lightbox && (
				<div
					onClick={() => setLightbox(null)}
					className='fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-fade-in-up'
					style={{ animationDuration: '0.2s' }}
				>
					<img
						src={lightbox}
						alt=''
						className='max-w-full max-h-full rounded-xl shadow-2xl'
						onClick={e => e.stopPropagation()}
					/>
				</div>
			)}
		</main>
	)
}
