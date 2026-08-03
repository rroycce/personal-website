'use client'

import { useState, useEffect } from 'react'
import '@/app/globals.css'

// Груповий імпорт усіх компонентів через @/components
import {
	LanguageProvider,
	ThemeToggle,
	LangToggle,
	CookieConsent,
	BackToTopButton,
	FAQModal,
	CalculatorModal,
	SplashCanvas,
	BackgroundDots,
	HeroSection,
	TechMarquee,
	TimelineSection,
	PrinciplesSection,
	PortfolioSection,
	ContactSection,
	FooterSection,
} from '@/components'

// Груповий імпорт хукiв
import { useScrollProgress, useRipples } from '@/hooks'

export default function Home() {
	const [splash, setSplash] = useState(false)
	const [splashOpacity, setSplashOpacity] = useState(1)
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem('darkMode')
		if (saved) setDarkMode(saved === 'true')
	}, [])
	useEffect(() => {
		document.documentElement.classList.toggle('dark', darkMode)
		localStorage.setItem('darkMode', String(darkMode))
	}, [darkMode])
	const [faqOpen, setFaqOpen] = useState(false)
	const [calcOpen, setCalcOpen] = useState(false)

	const scrollProgress = useScrollProgress()
	const { ripples, addRipple } = useRipples()

	return (
		<LanguageProvider>
			<SplashCanvas
				splash={splash}
				splashOpacity={splashOpacity}
				setSplash={setSplash}
				setSplashOpacity={setSplashOpacity}
			/>
			<FAQModal isOpen={faqOpen} onClose={() => setFaqOpen(false)} />
			<CalculatorModal isOpen={calcOpen} onClose={() => setCalcOpen(false)} />
			<BackToTopButton />
			<CookieConsent />

			<main
				onMouseMove={e => {
					e.currentTarget.style.setProperty('--mouse-x', `${e.clientX}px`)
					e.currentTarget.style.setProperty('--mouse-y', `${e.clientY}px`)
				}}
				onClick={addRipple}
				className='min-h-screen relative bg-[#Fbfbf9] dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-serif overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900 scroll-smooth transition-colors duration-500'
			>
				<ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
				<LangToggle />

				<div
					className='absolute top-0 left-0 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 z-50 transition-all duration-150 ease-out'
					style={{ width: `${scrollProgress * 100}%` }}
				/>
				<div className='mouse-glow hidden md:block' />
				{ripples.map(r => (
					<div
						key={r.id}
						className='click-ripple'
						aria-hidden='true'
						style={{ left: r.x, top: r.y }}
					/>
				))}
				<BackgroundDots darkMode={darkMode} />

				{/* Верхній блок (Hero + TechMarquee) */}
				<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-12 relative z-10'>
					<HeroSection splash={splash} onFaqClick={() => setFaqOpen(true)} />
					<TechMarquee />
				</div>

				{/* Справжнє легке/середнє матове скло (15% білого + 5px blur) */}
				<div className='w-full relative z-10 bg-white/15 dark:bg-zinc-900/20 backdrop-blur-[5px] border-t border-white/40 dark:border-zinc-800/40 shadow-[0_-15px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_-15px_40px_rgba(0,0,0,0.2)] transition-colors duration-500'>
					<div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-10 md:pt-16 pb-8 md:pb-12'>
						<TimelineSection />
						<PrinciplesSection />
						<PortfolioSection />
						<ContactSection onCalcClick={() => setCalcOpen(true)} />
						<FooterSection />
					</div>
				</div>
			</main>
		</LanguageProvider>
	)
}
