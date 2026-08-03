'use client'

import { useState, useEffect } from 'react'
import { HelpCircle, Download, FolderGit2, Mail } from 'lucide-react'
import { useLanguage } from '../providers/LanguageProvider'
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'
import { TECH_LIST, DB } from '../../data/db'
import { ProfileCard } from './ProfileCard'
import Link from 'next/link'

export const HeroSection = ({
	splash,
	onFaqClick,
}: {
	splash: boolean
	onFaqClick: () => void
}) => {
	const { t } = useLanguage()
	const [typedTitle, setTypedTitle] = useState('')

	useEffect(() => {
		if (splash) return

		const startDelay = setTimeout(() => {
			let i = 0
			const interval = setInterval(() => {
				i++
				setTypedTitle(t.heroTitle.slice(0, i))
				if (i >= t.heroTitle.length) clearInterval(interval)
			}, 80)
			return () => clearInterval(interval)
		}, 300)

		return () => clearTimeout(startDelay)
	}, [splash, t.heroTitle])

	const projectsCount = useAnimatedCounter(DB.ua.projects.length, 1500, !splash)
	const experienceCount = useAnimatedCounter(4, 1500, !splash)
	const techCount = useAnimatedCounter(TECH_LIST.length, 1500, !splash)

	// Плавний скрол до портфоліо
	const scrollToPortfolio = (
		e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
	) => {
		e.preventDefault()
		const element = document.getElementById('portfolio')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	// Плавний скрол до контактної форми (або відкриття поштової програми)
	const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		const element = document.getElementById('contact')
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		} else {
			// Якщо id="contact" немає, просто плавно скролимо вниз до форми зв'язку
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth',
			})
		}
	}

	return (
		<header className='mb-16 md:mb-20 mt-8 md:mt-16 relative'>
			<div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-5'>
				<div className='flex items-center gap-3 text-xs font-sans tracking-widest text-emerald-600 uppercase group cursor-default'>
					<span className='relative flex h-2.5 w-2.5'>
						<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
						<span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 group-hover:scale-125 transition-transform duration-300' />
					</span>
					<span className='group-hover:text-emerald-500 transition-colors'>
						{t.available}
					</span>
				</div>
				<div className='flex flex-wrap gap-3 self-start sm:self-auto'>
					<button
						onClick={onFaqClick}
						className='group flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-emerald-200 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 text-xs font-sans uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm'
					>
						<HelpCircle
							size={14}
							className='group-hover:rotate-12 transition-transform'
						/>
						<span>{t.faq}</span>
					</button>
					<Link
						href='/cv'
						className='group flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-emerald-200 dark:hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 text-xs font-sans uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm'
					>
						<Download size={14} className='group-hover:animate-bounce' />
						<span>{t.resume}</span>
					</Link>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] gap-6 md:gap-10 items-start md:items-center md:w-screen md:relative md:left-1/2 md:-translate-x-1/2 md:max-w-none md:px-8 lg:px-16 xl:px-24'>
				<div className='flex justify-center md:justify-start'>
					<ProfileCard />
				</div>
				<div className='text-center mt-6 md:mt-0'>
					<h1 className='text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-4 md:mb-6 text-zinc-900 dark:text-white leading-[1.2]'>
						{typedTitle.slice(0, 8)}
						<span
							className='typing-cursor blink'
							style={{ display: typedTitle.length <= 8 ? 'inline' : 'none' }}
						>
							|
						</span>
						<br className='hidden sm:block' />
						<span className='relative inline-block text-zinc-800 dark:text-zinc-300 italic gradient-underline pr-2 mt-2 sm:mt-0'>
							{typedTitle.slice(9)}
							<span
								className={`typing-cursor ${typedTitle.length >= t.heroTitle.length ? 'blink' : ''}`}
								style={{ display: typedTitle.length <= 8 ? 'none' : 'inline' }}
							>
								|
							</span>
						</span>
					</h1>
					<p className='text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto font-sans font-light'>
						{t.heroDesc}{' '}
						<a
							href='#portfolio'
							onClick={scrollToPortfolio}
							className='font-medium text-zinc-700 dark:text-zinc-200 hover:text-cyan-600 hover:underline underline-offset-4 transition-all cursor-pointer'
						>
							Python (Django / FastAPI)
						</a>
						,{' '}
						<a
							href='#portfolio'
							onClick={scrollToPortfolio}
							className='font-medium text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 hover:underline underline-offset-4 transition-all cursor-pointer'
						>
							JavaScript (Next.js)
						</a>{' '}
						та{' '}
						<a
							href='#portfolio'
							onClick={scrollToPortfolio}
							className='font-medium text-zinc-700 dark:text-zinc-200 hover:text-blue-500 hover:underline underline-offset-4 transition-all cursor-pointer'
						>
							SQL
						</a>
						.
					</p>

					{/* Головні CTA-кнопки */}
					<div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 md:mt-8 font-sans'>
						<button
							onClick={scrollToPortfolio}
							className='group flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs uppercase tracking-widest font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300'
						>
							<FolderGit2
								size={15}
								className='group-hover:scale-110 transition-transform text-cyan-400 dark:text-cyan-600'
							/>
							<span>Переглянути проєкти</span>
						</button>

						<button
							onClick={scrollToContact}
							className='group flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm hover:border-cyan-400 dark:hover:border-cyan-500 text-zinc-700 dark:text-zinc-300 hover:text-cyan-600 dark:hover:text-cyan-400 text-xs uppercase tracking-widest font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300'
						>
							<Mail
								size={15}
								className='group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform'
							/>
							<span>Зв'язатися</span>
						</button>
					</div>
				</div>
				<div className='flex flex-col items-center md:items-end justify-center gap-4 animate-fade-in-up delay-300'>
					<div className='flex flex-row flex-wrap gap-4 md:gap-6 justify-center md:justify-end w-full'>
						<div className='text-center md:text-right max-w-[110px] md:max-w-[140px]'>
							<div className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-white'>
								{projectsCount}+
							</div>
							<div className='text-xs font-sans uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2 text-center'>
								{t.stats.projects}
							</div>
						</div>
						<div className='text-center md:text-right w-[90px] sm:w-[110px] md:w-[130px] shrink-0'>
							<div className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-white'>
								{experienceCount}+
							</div>
							<div className='text-xs font-sans uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2 text-center leading-tight'>
								{t.stats.experience}
							</div>
						</div>
						<div className='text-center md:text-right'>
							<div className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-zinc-900 dark:text-white'>
								{techCount}+
							</div>
							<div className='text-xs font-sans uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mt-2 text-center'>
								{t.stats.tech}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
