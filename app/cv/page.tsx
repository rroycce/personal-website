'use client'

import React from 'react'

export default function CVPage() {
	const handlePrint = () => {
		window.print()
	}

	return (
		<main className='min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8 print:bg-white print:text-black print:py-0 print:px-0'>
			<div className='max-w-4xl mx-auto bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-md print:bg-white print:border-none print:shadow-none print:p-0'>
				{/* Шапка резюме + Кнопки */}
				<header className='flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-neutral-800 pb-8 print:border-neutral-300 print:pb-4'>
					<div>
						<h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-white print:text-black'>
							РОМАН
						</h1>
						<p className='text-lg font-medium text-emerald-400 mt-1 print:text-neutral-700'>
							Junior Software Developer
						</p>
						<p className='text-sm text-neutral-400 mt-2 print:text-neutral-600'>
							Львів, Україна
						</p>
					</div>

					{/* Контакти */}
					<div className='flex flex-wrap sm:flex-col gap-2 text-sm text-neutral-300 print:text-neutral-800 sm:text-right'>
						<a
							href='mailto:commercialdevr@gmail.com'
							className='hover:text-emerald-400 transition-colors underline-offset-4 hover:underline'
						>
							commercialdevr@gmail.com
						</a>
						<a
							href='https://rroycce.vercel.app'
							target='_blank'
							rel='noreferrer'
							className='hover:text-emerald-400 transition-colors underline-offset-4 hover:underline'
						>
							rroycce.vercel.app
						</a>
						<a
							href='https://github.com/rroycce'
							target='_blank'
							rel='noreferrer'
							className='hover:text-emerald-400 transition-colors underline-offset-4 hover:underline'
						>
							github.com/rroycce
						</a>
						<a
							href='https://t.me/a_posteriorii'
							target='_blank'
							rel='noreferrer'
							className='hover:text-emerald-400 transition-colors underline-offset-4 hover:underline'
						>
							t.me/a_posteriorii
						</a>
					</div>
				</header>

				{/* Кнопки дій (Ховаються при друку/PDF) */}
				<div className='flex flex-wrap gap-3 my-6 print:hidden'>
					<button
						onClick={handlePrint}
						className='inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95'
					>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
							/>
						</svg>
						Зберегти у PDF / Друк
					</button>

					<a
						href='/cv.pdf'
						download
						className='inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium px-5 py-2.5 rounded-xl border border-neutral-700 transition-all active:scale-95'
					>
						<svg
							className='w-5 h-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
							/>
						</svg>
						Завантажити готовий PDF
					</a>
				</div>

				{/* ПРО СЕБЕ */}
				<section className='mt-8 print:mt-4'>
					<h2 className='text-xs uppercase tracking-widest font-semibold text-emerald-400 print:text-neutral-600 mb-3'>
						Про себе
					</h2>
					<p className='text-neutral-300 print:text-neutral-800 leading-relaxed text-sm sm:text-base'>
						Розробник-початківець із фокусом на Python. Реалізував кілька
						проєктів: CRM-систему для автосервісу (з невеликою командою),
						Telegram-бота для моніторингу квитків Укрзалізниці та інструменти
						автоматизації обробки відео. Швидко розбираюсь у нових технологіях
						та відкритий до універсальних задач — готовий довчити необхідний
						стек під конкретні потреби команди.
					</p>
				</section>

				{/* ТЕХНІЧНІ НАВИЧКИ */}
				<section className='mt-8 print:mt-4'>
					<h2 className='text-xs uppercase tracking-widest font-semibold text-emerald-400 print:text-neutral-600 mb-4'>
						Технічні навички
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
						<div className='bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 print:border-neutral-200 print:bg-transparent'>
							<span className='font-semibold text-white print:text-black'>
								Мови програмування:{' '}
							</span>
							<span className='text-neutral-300 print:text-neutral-800'>
								Python, HTML, JavaScript (базовий рівень)
							</span>
						</div>
						<div className='bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 print:border-neutral-200 print:bg-transparent'>
							<span className='font-semibold text-white print:text-black'>
								Фреймворки:{' '}
							</span>
							<span className='text-neutral-300 print:text-neutral-800'>
								Django, FastAPI (основи), Next.js / React (основи)
							</span>
						</div>
						<div className='bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 print:border-neutral-200 print:bg-transparent'>
							<span className='font-semibold text-white print:text-black'>
								Бази даних:{' '}
							</span>
							<span className='text-neutral-300 print:text-neutral-800'>
								SQL, SQLite
							</span>
						</div>
						<div className='bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 print:border-neutral-200 print:bg-transparent'>
							<span className='font-semibold text-white print:text-black'>
								Інструменти:{' '}
							</span>
							<span className='text-neutral-300 print:text-neutral-800'>
								Git/GitHub, Selenium, FFmpeg, Linux (Ubuntu, systemd)
							</span>
						</div>
						<div className='sm:col-span-2 bg-neutral-800/40 p-3.5 rounded-xl border border-neutral-800 print:border-neutral-200 print:bg-transparent'>
							<span className='font-semibold text-white print:text-black'>
								Інше:{' '}
							</span>
							<span className='text-neutral-300 print:text-neutral-800'>
								Telegram Bot API (aiogram, pyTelegramBotAPI), веб-скрейпінг та
								автоматизація процесів
							</span>
						</div>
					</div>
				</section>

				{/* ДОСВІД */}
				<section className='mt-8 print:mt-4'>
					<h2 className='text-xs uppercase tracking-widest font-semibold text-emerald-400 print:text-neutral-600 mb-4'>
						Досвід
					</h2>
					<div className='space-y-6 print:space-y-4'>
						<div className='border-l-2 border-emerald-500/50 pl-4 print:border-neutral-400'>
							<div className='flex flex-col sm:flex-row sm:items-center justify-between'>
								<h3 className='font-semibold text-white print:text-black'>
									Software Engineer — самостійна практика
								</h3>
								<span className='text-xs font-mono text-neutral-400'>
									2026 — дотепер
								</span>
							</div>
							<p className='text-sm text-neutral-300 print:text-neutral-800 mt-1'>
								Розробка та підтримка власних проєктів: CRM-система,
								Telegram-боти, інструменти автоматизації.
							</p>
						</div>

						<div className='border-l-2 border-emerald-500/50 pl-4 print:border-neutral-400'>
							<div className='flex flex-col sm:flex-row sm:items-center justify-between'>
								<h3 className='font-semibold text-white print:text-black'>
									Full-Stack Developer, командний проєкт
								</h3>
								<span className='text-xs font-mono text-neutral-400'>
									2025 — 2026
								</span>
							</div>
							<p className='text-sm text-neutral-300 print:text-neutral-800 mt-1'>
								Участь у розробці веб-застосунку в складі команди; досвід
								командної роботи та контролю версій (Git).
							</p>
						</div>
					</div>
				</section>

				{/* КЛЮЧОВІ ПРОЄКТИ */}
				<section className='mt-8 print:mt-4'>
					<h2 className='text-xs uppercase tracking-widest font-semibold text-emerald-400 print:text-neutral-600 mb-4'>
						Ключові проєкти
					</h2>
					<div className='space-y-5 print:space-y-3'>
						{/* ApexMotors */}
						<div className='p-4 rounded-xl bg-neutral-800/30 border border-neutral-800 print:border-neutral-200 print:bg-transparent print:p-2'>
							<div className='flex flex-wrap items-baseline justify-between gap-2'>
								<h3 className='font-bold text-white print:text-black'>
									AutoCRM &quot;ApexMotors&quot;
								</h3>
								<span className='text-xs font-mono text-emerald-400 print:text-neutral-700'>
									Django · SQLite · Bootstrap · JavaScript
								</span>
							</div>
							<ul className='list-disc list-inside text-sm text-neutral-300 print:text-neutral-800 mt-2 space-y-1'>
								<li>
									Лендінг для запису клієнтів автосервісу + CRM для персоналу з
									розподілом заявок між менеджером і механіком.
								</li>
								<li>
									Автоматичний пошук марки, кольору та фото авто за номером;
									автогенерація акту виконаних робіт.
								</li>
							</ul>
						</div>

						{/* UZ_tickets_hunter */}
						<div className='p-4 rounded-xl bg-neutral-800/30 border border-neutral-800 print:border-neutral-200 print:bg-transparent print:p-2'>
							<div className='flex flex-wrap items-baseline justify-between gap-2'>
								<h3 className='font-bold text-white print:text-black'>
									UZ_tickets_hunter
								</h3>
								<span className='text-xs font-mono text-emerald-400 print:text-neutral-700'>
									Python · SeleniumBase · BeautifulSoup · SQLite
								</span>
							</div>
							<ul className='list-disc list-inside text-sm text-neutral-300 print:text-neutral-800 mt-2 space-y-1'>
								<li>
									Telegram-бот для цілодобового моніторингу квитків Укрзалізниці
									через реальний браузер з обходом захисту від ботів.
								</li>
								<li>
									Гнучке групування місць (по 2, по 4, з боковими) та миттєві
									сповіщення в чат.
								</li>
							</ul>
						</div>

						{/* VideoSlicer */}
						<div className='p-4 rounded-xl bg-neutral-800/30 border border-neutral-800 print:border-neutral-200 print:bg-transparent print:p-2'>
							<div className='flex flex-wrap items-baseline justify-between gap-2'>
								<h3 className='font-bold text-white print:text-black'>
									VideoSlicer — AI Shorts
								</h3>
								<span className='text-xs font-mono text-emerald-400 print:text-neutral-700'>
									Python · Streamlit · FFmpeg · Gemini API
								</span>
							</div>
							<p className='text-sm text-neutral-300 print:text-neutral-800 mt-2'>
								Автоматизація перетворення довгих відео на короткі ролики:
								розпізнавання мовлення (Faster Whisper), пошук цікавих моментів
								(Gemini) та монтаж із субтитрами (FFmpeg).
							</p>
						</div>

						{/* Інші проєкти */}
						<div className='text-sm text-neutral-400 print:text-neutral-700 pt-1'>
							<span className='font-semibold text-neutral-200 print:text-black'>
								Інші проєкти:{' '}
							</span>
							Film Downloader (десктопний застосунок для завантаження потокових
							відео — Python, Tkinter, FFmpeg), Horizon (гра-вікторина на
							географію — JavaScript, Google Maps API), особистий сайт-портфоліо
							(Next.js, React, TypeScript).
						</div>
					</div>
				</section>

				{/* ОСВІТА ТА МОВИ */}
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 pt-8 border-t border-neutral-800 print:border-neutral-300 print:mt-4 print:pt-4'>
					{/* Освіта */}
					<section>
						<h2 className='text-xs uppercase tracking-widest font-semibold text-emerald-400 print:text-neutral-600 mb-3'>
							Освіта
						</h2>
						<div className='space-y-3 text-sm'>
							<div>
								<div className='font-semibold text-white print:text-black'>
									НЛТУ України
								</div>
								<div className='text-neutral-400 text-xs'>
									2026 — 2029 (навчаюся)
								</div>
								<div className='text-neutral-300 print:text-neutral-800 mt-0.5'>
									Інженерія програмного забезпечення, бакалавр.
								</div>
							</div>
							<div>
								<div className='font-semibold text-white print:text-black'>
									Червоноградський гірничоекономічний фаховий коледж
								</div>
								<div className='text-neutral-400 text-xs'>2022 — 2026</div>
								<div className='text-neutral-300 print:text-neutral-800 mt-0.5'>
									Інженерія програмного забезпечення.
								</div>
							</div>
						</div>
					</section>

					{/* Мови */}
					<section>
						<h2 className='text-xs uppercase tracking-widest font-semibold text-emerald-400 print:text-neutral-600 mb-3'>
							Мови
						</h2>
						<ul className='space-y-2 text-sm text-neutral-300 print:text-neutral-800'>
							<li>
								<span className='font-semibold text-white print:text-black'>
									Українська
								</span>{' '}
								— рідна
							</li>
							<li>
								<span className='font-semibold text-white print:text-black'>
									Англійська
								</span>{' '}
								— A2–B1 (читання технічної документації)
							</li>
						</ul>
					</section>
				</div>
			</div>
		</main>
	)
}
