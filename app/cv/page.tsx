'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Download, Check, Sun, Moon } from 'lucide-react'

const cvData = {
	ua: {
		back: '← НАЗАД ДО ПОРТФОЛІО',
		badge: '2026 • RESUME / CV',
		name: 'РОМАН',
		role: 'Junior Software Developer',
		location: 'Львів, Україна',
		printBtn: 'Зберегти PDF / Друк',
		downloadBtn: 'Завантажити файл',

		aboutTitle: 'ПРО СЕБЕ',
		aboutText:
			'Розробник-початківець із фокусом на Python. Реалізував кілька проєктів: CRM-систему для автосервісу (з невеликою командою), Telegram-бота для моніторингу квитків Укрзалізниці та інструменти автоматизації обробки відео. Швидко розбираюсь у нових технологіях та відкритий до універсальних задач — готовий довчити необхідний стек під конкретні потреби команди.',

		skillsTitle: 'ТЕХНІЧНІ НАВИЧКИ',
		skills: [
			{
				label: 'Мови програмування:',
				val: 'Python, HTML, JavaScript (базовий рівень)',
			},
			{
				label: 'Фреймворки:',
				val: 'Django, FastAPI (основи), Next.js / React (основи)',
			},
			{ label: 'Бази даних:', val: 'SQL, SQLite' },
			{
				label: 'Інструменти:',
				val: 'Git/GitHub, Selenium, FFmpeg',
			},
			{
				label: 'Інше:',
				val: 'Telegram Bot API (aiogram, pyTelegramBotAPI), веб-скрапінг та автоматизація процесів',
			},
		],

		expTitle: 'ДОСВІД',
		exp: [
			{
				role: 'Software Engineer — самостійна практика',
				period: '2026 — дотепер',
				desc: 'Розробка та підтримка власних проєктів: CRM-система, Telegram-боти, інструменти автоматизації.',
			},
			{
				role: 'Full-Stack Developer, командний проєкт',
				period: '2025 — 2026',
				desc: 'Участь у розробці веб-застосунку в складі команди; досвід командної роботи та контролю версій (Git).',
			},
		],

		projectsTitle: 'КЛЮЧОВІ ПРОЄКТИ',
		projects: [
			{
				title: 'AutoCRM "ApexMotors"',
				tech: 'Django, SQLite, Bootstrap, JavaScript',
				points: [
					'Лендінг для запису клієнтів автосервісу + CRM для персоналу з розподілом заявок між менеджером і механіком.',
					'Автоматичний пошук марки, кольору та фото авто за номером; автогенерація акту виконаних робіт.',
				],
			},
			{
				title: 'UZ_tickets_hunter',
				tech: 'Python, SeleniumBase, BeautifulSoup, SQLite',
				points: [
					'Telegram-бот для цілодобового моніторингу квитків Укрзалізниці через реальний браузер з обходом захисту від ботів.',
					'Гнучке групування місць (по 2, по 4, з боковими) та миттєві сповіщення в чат.',
				],
			},
			{
				title: 'VideoSlicer — AI Shorts',
				tech: 'Python, Streamlit, FFmpeg, Gemini API',
				desc: 'Автоматизація перетворення довгих відео на короткі ролики: розпізнавання мовлення (Faster Whisper), пошук цікавих моментів (Gemini) та монтаж із субтитрами (FFmpeg).',
			},
		],
		otherProjects:
			'Інші проєкти: Film Downloader (десктопний застосунок для завантаження потокових відео — Python, Tkinter, FFmpeg), Horizon (гра-вікторина на географію — JavaScript, Google Maps API), особистий сайт-портфоліо (Next.js, React, TypeScript).',
		projectLinks: 'Деталі проєктів та код:',

		eduTitle: 'ОСВІТА',
		edu: [
			{
				school: 'Червоноградський гірничоекономічний фаховий коледж',
				period: '2022 — 2026',
				desc: 'Інженерія програмного забезпечення.',
			},
			{
				school: 'НЛТУ України',
				period: '2026 — 2029 (навчаюся)',
				desc: 'Інженерія програмного забезпечення, бакалавр.',
			},
		],

		langTitle: 'МОВИ',
		languages: [
			{ name: 'Українська', val: '— рідна' },
			{ name: 'Англійська', val: '— A2–B1 (читання технічної документації)' },
		],
	},
	en: {
		back: '← BACK TO PORTFOLIO',
		badge: '2026 • RESUME / CV',
		name: 'ROMAN',
		role: 'Junior Software Developer',
		location: 'Lviv, Ukraine',
		printBtn: 'Save PDF / Print',
		downloadBtn: 'Download File',

		aboutTitle: 'ABOUT ME',
		aboutText:
			'Junior Software Developer focused on Python. Built several practical projects: a CRM system for car service shops (collaborative work), a Telegram bot for railway ticket monitoring, and automated video processing tools. Fast learner, adaptable to new tech stacks, and open to full-stack or backend responsibilities to meet team goals.',

		skillsTitle: 'TECHNICAL SKILLS',
		skills: [
			{
				label: 'Programming Languages:',
				val: 'Python, HTML, JavaScript (basic)',
			},
			{
				label: 'Frameworks & Libs:',
				val: 'Django, FastAPI (basics), Next.js / React (basics)',
			},
			{ label: 'Databases:', val: 'SQL, SQLite' },
			{
				label: 'Tools:',
				val: 'Git/GitHub, Selenium, FFmpeg',
			},
			{
				label: 'Other:',
				val: 'Telegram Bot API (aiogram, pyTelegramBotAPI), Web Scraping, Process Automation',
			},
		],

		expTitle: 'EXPERIENCE',
		exp: [
			{
				role: 'Software Engineer — Self-Directed Practice',
				period: '2026 — Present',
				desc: 'Developing and maintaining independent tools: CRM software, automated Telegram bots, and video manipulation scripts.',
			},
			{
				role: 'Full-Stack Developer, Team Project',
				period: '2025 — 2026',
				desc: 'Contributed to full-stack web application development in a small team; gained experience in version control (Git) and workflow collaboration.',
			},
		],

		projectsTitle: 'KEY PROJECTS',
		projects: [
			{
				title: 'AutoCRM "ApexMotors"',
				tech: 'Django, SQLite, Bootstrap, JavaScript',
				points: [
					'Landing page for auto service appointments + internal CRM for order distribution between managers and mechanics.',
					'Automatic detection of vehicle brand, color, and photos by license plate number; automated invoice generation.',
				],
			},
			{
				title: 'UZ_tickets_hunter',
				tech: 'Python, SeleniumBase, BeautifulSoup, SQLite',
				points: [
					'24/7 Telegram bot monitoring Ukrainian Railway tickets using a real browser automation setup to bypass anti-bot systems.',
					'Flexible grouping options (2 or 4 adjacent seats, side bunks) with instant Telegram notifications.',
				],
			},
			{
				title: 'VideoSlicer — AI Shorts',
				tech: 'Python, Streamlit, FFmpeg, Gemini API',
				desc: 'Automates cutting long videos into engaging Shorts/Reels: speech recognition (Faster Whisper), highlight detection (Gemini API), and auto-subtitled editing (FFmpeg).',
			},
		],
		otherProjects:
			'Other projects: Film Downloader (desktop app for streaming video downloading — Python, Tkinter, FFmpeg), Horizon (geography quiz game — JavaScript, Google Maps API), personal portfolio (Next.js, React, TypeScript).',
		projectLinks: 'Project details and code:',

		eduTitle: 'EDUCATION',
		edu: [
			{
				school: 'Chervonohrad Mining and Economic Professional College',
				period: '2022 — 2026',
				desc: 'Software Engineering.',
			},
			{
				school: 'UNFU (National Forestry University of Ukraine)',
				period: '2026 — 2029 (in progress)',
				desc: 'Software Engineering, Bachelor’s Degree.',
			},
		],

		langTitle: 'LANGUAGES',
		languages: [
			{ name: 'Ukrainian', val: '— Native' },
			{ name: 'English', val: '— A2–B1 (Technical documentation reading)' },
		],
	},
}

const PILLS = [
	'PYTHON',
	'DJANGO',
	'SQLITE',
	'NEXT.JS',
	'SELENIUM',
	'TELEGRAM API',
]

export default function CVPage() {
	const [lang, setLang] = useState<'ua' | 'en'>('ua')
	const [darkMode, setDarkMode] = useState(true)

	useEffect(() => {
		const isDark = document.documentElement.classList.contains('dark')
		setDarkMode(isDark)
	}, [])

	const t = cvData[lang]

	const handlePrint = () => {
		window.print()
	}

	const toggleLanguage = () => {
		setLang(prev => (prev === 'ua' ? 'en' : 'ua'))
	}

	const toggleTheme = () => {
		const nextDark = !darkMode
		setDarkMode(nextDark)
		if (nextDark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	return (
		<main className='min-h-screen bg-[#FBFBFB] dark:bg-[#0F1012] text-zinc-900 dark:text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 print:bg-white print:text-black print:py-0 print:px-0'>
			{/* ================= КНОПКИ ПЕРЕМИКАННЯ МОВИ ТА ТЕМИ ================= */}
			<div className='fixed top-4 right-4 z-[9900] flex items-center gap-3 print:hidden'>
				{/* Кнопка мови UA/EN */}
				<button
					type='button'
					onClick={toggleLanguage}
					className='w-12 h-10 rounded-full bg-white dark:bg-[#16171A] border border-zinc-200 dark:border-[#2E2F32] shadow-sm flex items-center justify-center text-xs font-sans font-medium uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-zinc-600 dark:text-zinc-300 cursor-pointer'
				>
					{lang.toUpperCase()}
				</button>

				{/* Кнопка теми */}
				<button
					type='button'
					onClick={toggleTheme}
					className='w-20 h-10 rounded-full bg-white dark:bg-[#16171A] border border-zinc-200 dark:border-[#2E2F32] shadow-sm cursor-pointer flex items-center justify-between px-2.5 relative overflow-hidden transition-all hover:scale-105 active:scale-95'
					title='Змінити тему'
				>
					<Sun
						className={`z-10 transition-colors ${!darkMode ? 'text-zinc-900' : 'text-zinc-500'}`}
						size={16}
					/>
					<div
						className={`absolute top-1 w-[30px] h-[30px] rounded-full bg-emerald-100 dark:bg-zinc-800 transition-all duration-300 ${darkMode ? 'left-[calc(100%-34px)]' : 'left-[4px]'}`}
					/>
					<Moon
						className={`z-10 transition-colors ${darkMode ? 'text-zinc-200' : 'text-zinc-400'}`}
						size={16}
					/>
				</button>
			</div>

			{/* ================= 2-КОЛОНКОВА СІТКА ================= */}
			<div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start'>
				{/* ЛІВА КОЛОНКА (Сайдбар) */}
				<div className='lg:sticky lg:top-12 flex flex-col'>
					<Link
						href='/'
						className='inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 mb-8 transition-colors print:hidden'
					>
						<span>{t.back}</span>
					</Link>

					<div className='w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center shadow-sm mb-6 print:hidden'>
						<span className='text-2xl font-bold text-emerald-500'>CV</span>
					</div>

					<div className='flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold mb-2'>
						<span>2026</span>
						<span>•</span>
						<span>RESUME</span>
					</div>

					<h1 className='text-3xl sm:text-4xl font-serif font-bold tracking-tight text-zinc-900 dark:text-white my-2 print:text-black'>
						{t.name} — {t.role}
					</h1>

					<p className='text-sm italic text-zinc-500 dark:text-zinc-400 my-2 leading-relaxed'>
						{t.location}
					</p>

					{/* КЛІКАТНІ ПОСИЛАННЯ */}
					<div className='flex flex-col gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 my-3'>
						<a
							href='mailto:commercialdevr@gmail.com'
							className='hover:text-emerald-500 transition-colors'
						>
							commercialdevr@gmail.com
						</a>
						<a
							href='https://rroycce.vercel.app'
							target='_blank'
							rel='noreferrer'
							className='hover:text-emerald-500 transition-colors'
						>
							rroycce.vercel.app
						</a>
						<a
							href='https://github.com/rroycce'
							target='_blank'
							rel='noreferrer'
							className='hover:text-emerald-500 transition-colors'
						>
							github.com/rroycce
						</a>
						<a
							href='https://t.me/a_posteriorii'
							target='_blank'
							rel='noreferrer'
							className='hover:text-emerald-500 transition-colors'
						>
							t.me/a_posteriorii
						</a>
					</div>

					{/* Теги-пігулки */}
					<div className='flex flex-wrap gap-2 my-4 print:hidden'>
						{PILLS.map((pill, i) => (
							<span
								key={i}
								className='px-3 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50'
							>
								{pill}
							</span>
						))}
					</div>

					{/* Кнопки завантаження / друку */}
					<div className='flex flex-wrap gap-3 mt-6 print:hidden'>
						<a
							href='/cv.pdf'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-md active:scale-95'
						>
							<Download size={15} />
							<span>{t.printBtn}</span>
						</a> 

						<a
							href='/cv.pdf'
							download='Roman_CV.pdf'
							className='inline-flex items-center gap-2 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all active:scale-95'
						>
							<span>{t.downloadBtn}</span>
						</a>
					</div>
				</div>

				{/* ПРАВА КОЛОНКА (Основний зміст) */}
				<div className='bg-white dark:bg-[#16171A] border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-10 sm:py-12 shadow-sm print:border-none print:shadow-none print:p-0 print:bg-white'>
					{/* ПРО СЕБЕ */}
					<section>
						<h2 className='text-lg font-serif italic text-zinc-900 dark:text-white mb-3 print:text-black'>
							{t.aboutTitle}
						</h2>
						<p className='text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed print:text-black'>
							{t.aboutText}
						</p>
					</section>

					<hr className='my-8 border-zinc-200 dark:border-zinc-800 print:border-neutral-300' />

					{/* ТЕХНІЧНІ НАВИЧКИ */}
					<section>
						<h2 className='text-lg font-serif italic text-zinc-900 dark:text-white mb-5 print:text-black'>
							{t.skillsTitle}
						</h2>
						<ul className='space-y-3'>
							{t.skills.map((skill, idx) => (
								<li
									key={idx}
									className='flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 print:text-neutral-800'
								>
									<span className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5'>
										<Check size={12} strokeWidth={3} />
									</span>
									<span className='leading-relaxed'>
										<strong className='text-zinc-900 dark:text-zinc-200 print:text-black'>
											{skill.label}
										</strong>{' '}
										{skill.val}
									</span>
								</li>
							))}
						</ul>
					</section>

					<hr className='my-8 border-zinc-200 dark:border-zinc-800 print:border-neutral-300' />

					{/* ДОСВІД */}
					<section>
						<h2 className='text-lg font-serif italic text-zinc-900 dark:text-white mb-5 print:text-black'>
							{t.expTitle}
						</h2>
						<div className='space-y-6'>
							{t.exp.map((item, idx) => (
								<div key={idx} className='space-y-1'>
									<div className='flex flex-wrap justify-between items-baseline gap-2 font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 print:text-black'>
										<span>{item.role}</span>
										<span className='text-xs font-mono text-emerald-600 dark:text-emerald-400'>
											{item.period}
										</span>
									</div>
									<p className='text-sm text-zinc-600 dark:text-zinc-400 print:text-neutral-800'>
										{item.desc}
									</p>
								</div>
							))}
						</div>
					</section>

					<hr className='my-8 border-zinc-200 dark:border-zinc-800 print:border-neutral-300' />

					{/* КЛЮЧОВІ ПРОЄКТИ */}
					<section>
						<h2 className='text-lg font-serif italic text-zinc-900 dark:text-white mb-5 print:text-black'>
							{t.projectsTitle}
						</h2>
						<div className='space-y-6'>
							{t.projects.map((proj, idx) => (
								<div key={idx} className='space-y-2'>
									<div className='flex flex-wrap items-baseline justify-between gap-2'>
										<h3 className='font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 print:text-black'>
											{proj.title}
										</h3>
										<span className='text-xs font-mono text-emerald-600 dark:text-emerald-400'>
											{proj.tech}
										</span>
									</div>
									{proj.points ? (
										<ul className='space-y-1.5'>
											{proj.points.map((pt, i) => (
												<li
													key={i}
													className='flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 print:text-neutral-800'
												>
													<span className='inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5'>
														<Check size={12} strokeWidth={3} />
													</span>
													<span className='leading-relaxed'>{pt}</span>
												</li>
											))}
										</ul>
									) : (
										<p className='text-sm text-zinc-600 dark:text-zinc-400 print:text-neutral-800'>
											{proj.desc}
										</p>
									)}
								</div>
							))}

							{/* Інші проєкти та посилання */}
							<div className='pt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400 print:text-neutral-800 border-t border-zinc-100 dark:border-zinc-800/60'>
								<p>{t.otherProjects}</p>
								<p className='font-mono text-xs text-emerald-600 dark:text-emerald-400 flex flex-wrap gap-2'>
									<span>{t.projectLinks}</span>
									<a
										href='https://rroycce.vercel.app'
										target='_blank'
										rel='noreferrer'
										className='underline hover:text-emerald-500'
									>
										rroycce.vercel.app
									</a>
									<span>·</span>
									<a
										href='https://github.com/rroycce'
										target='_blank'
										rel='noreferrer'
										className='underline hover:text-emerald-500'
									>
										github.com/rroycce
									</a>
								</p>
							</div>
						</div>
					</section>

					<hr className='my-8 border-zinc-200 dark:border-zinc-800 print:border-neutral-300' />

					{/* ОСВІТА ТА МОВИ */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
						<section>
							<h2 className='text-lg font-serif italic text-zinc-900 dark:text-white mb-4 print:text-black'>
								{t.eduTitle}
							</h2>
							<div className='space-y-4'>
								{t.edu.map((item, idx) => (
									<div key={idx} className='text-sm'>
										<div className='font-semibold text-zinc-900 dark:text-zinc-100 print:text-black'>
											{item.school}
										</div>
										<div className='text-xs font-mono text-emerald-600 dark:text-emerald-400 my-0.5'>
											{item.period}
										</div>
										<div className='text-zinc-600 dark:text-zinc-400 print:text-neutral-800'>
											{item.desc}
										</div>
									</div>
								))}
							</div>
						</section>

						<section>
							<h2 className='text-lg font-serif italic text-zinc-900 dark:text-white mb-4 print:text-black'>
								{t.langTitle}
							</h2>
							<ul className='space-y-2.5 text-sm'>
								{t.languages.map((langItem, idx) => (
									<li
										key={idx}
										className='text-zinc-600 dark:text-zinc-400 print:text-neutral-800'
									>
										<strong className='text-zinc-900 dark:text-zinc-200 print:text-black'>
											{langItem.name}
										</strong>{' '}
										{langItem.val}
									</li>
								))}
							</ul>
						</section>
					</div>
				</div>
			</div>
		</main>
	)
}
