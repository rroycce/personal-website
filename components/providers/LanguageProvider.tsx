'use client'

import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react'
import { DICTIONARY } from '@/data/dictionary'
import { DB } from '@/data/db'
import { Lang } from '@/types'

const LANGUAGE_STORAGE_KEY = 'preferredLanguage'

const LanguageContext = createContext<{
	lang: Lang
	setLang: (l: Lang) => void
	t: typeof DICTIONARY.ua
	db: typeof DB.ua
}>({
	lang: 'ua',
	setLang: () => {},
	t: DICTIONARY.ua,
	db: DB.ua,
})

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [lang, setLangState] = useState<Lang>('ua')

	// Завантажуємо мову з localStorage при монтуванні
	useEffect(() => {
		const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY)
		if (saved === 'ua' || saved === 'en') {
			setLangState(saved)
		}
	}, [])

	// Функція зміни мови – оновлює стан і зберігає в localStorage
	const setLang = (newLang: Lang) => {
		setLangState(newLang)
		localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang)
	}

	const t = DICTIONARY[lang]
	const db = DB[lang]

	return (
		<LanguageContext.Provider value={{ lang, setLang, t, db }}>
			{children}
		</LanguageContext.Provider>
	)
}

export const useLanguage = () => useContext(LanguageContext)
