'use client'

import { useLanguage } from '@/components/providers/LanguageProvider'

export const LangToggle = () => {
	const { lang, setLang } = useLanguage()
	return (
		<button
			onClick={() => setLang(lang === 'ua' ? 'en' : 'ua')}
			className='lang-switch fixed top-[1rem] right-[calc(1rem+80px+12px)] z-[9900] w-12 h-10 rounded-full bg-white/80 dark:bg-[#16171A]/80 border border-zinc-200/80 dark:border-[#2E2F32] shadow-sm flex items-center justify-center text-xs font-sans font-medium uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-zinc-600 dark:text-zinc-300 backdrop-blur-md'
		>
			{lang}
		</button>
	)
}
