'use client'

import { useState, useEffect } from 'react'
import {
	Calculator,
	X,
	ChevronLeft,
	ChevronRight,
	ChevronDown,
	Check,
	Mail,
} from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

const UAH_RATE = 41

const extraVisibility: Record<string, string[]> = {
	landing: ['design', 'seo', 'multilang'],
	bot: ['db', 'api', 'payment', 'notifications', 'admin'],
	crm: ['db', 'api', 'admin', 'auth', 'multilang'],
	complex: [
		'design',
		'db',
		'seo',
		'api',
		'payment',
		'admin',
		'auth',
		'multilang',
	],
	shop: ['design', 'db', 'seo', 'api', 'payment', 'auth', 'multilang'],
	parser: ['db', 'api'],
	mobile: [
		'design',
		'db',
		'api',
		'notifications',
		'auth',
		'publish',
		'multilang',
	],
}

const extraPrices: Record<string, number> = {
	design: 100,
	db: 120,
	seo: 60,
	api: 90,
	payment: 90,
	admin: 120,
	notifications: 50,
	auth: 90,
	multilang: 60,
	publish: 50,
	hosting: 40,
	support: 80,
}

const emptyExtras = {
	design: false,
	db: false,
	seo: false,
	api: false,
	payment: false,
	admin: false,
	notifications: false,
	auth: false,
	multilang: false,
	publish: false,
	hosting: false,
	support: false,
}

const CheckboxItem = ({
	checked,
	onChange,
	label,
}: {
	checked: boolean
	onChange: (v: boolean) => void
	label: string
}) => (
	<label className='flex items-center gap-3 cursor-pointer group'>
		<button
			type='button'
			onClick={() => onChange(!checked)}
			className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
				checked
					? 'bg-cyan-500 border-cyan-500'
					: 'bg-white/50 dark:bg-zinc-900/50 border-zinc-300 dark:border-zinc-600 group-hover:border-cyan-300'
			}`}
		>
			{checked && <Check size={13} className='text-white' strokeWidth={3} />}
		</button>
		<span className='text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors'>
			{label}
		</span>
	</label>
)

export const CalculatorModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean
	onClose: () => void
}) => {
	const { t } = useLanguage()
	const [step, setStep] = useState(1)
	const [type, setType] = useState('landing')
	const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex'>(
		'medium',
	)
	const [urgent, setUrgent] = useState(false)
	const [currency, setCurrency] = useState<'usd' | 'uah'>('usd')
	const [pages, setPages] = useState(1)
	const [roles, setRoles] = useState(1)
	const [integrations, setIntegrations] = useState(0)
	const [extras, setExtras] = useState(emptyExtras)

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset'
	}, [isOpen])

	useEffect(() => {
		const saved = sessionStorage.getItem('calcState')
		if (saved) {
			try {
				const s = JSON.parse(saved)
				setType(s.type ?? 'landing')
				setComplexity(s.complexity ?? 'medium')
				setUrgent(s.urgent ?? false)
				setCurrency(s.currency ?? 'usd')
				setPages(s.pages ?? 1)
				setRoles(s.roles ?? 1)
				setIntegrations(s.integrations ?? 0)
				setExtras({ ...emptyExtras, ...(s.extras ?? {}) })
			} catch {}
		}
	}, [])

	useEffect(() => {
		setExtras(prev => {
			const next = { ...prev }
			;(Object.keys(next) as (keyof typeof next)[]).forEach(key => {
				if (key === 'hosting' || key === 'support') return
				next[key] = extraVisibility[type].includes(key) ? prev[key] : false
			})
			return next
		})
	}, [type])

	useEffect(() => {
		sessionStorage.setItem(
			'calcState',
			JSON.stringify({
				type,
				complexity,
				urgent,
				currency,
				pages,
				roles,
				integrations,
				extras,
			}),
		)
	}, [type, complexity, urgent, currency, pages, roles, integrations, extras])

	if (!isOpen) return null

	const basePrices: Record<string, number> = {
		landing: 120,
		bot: 70,
		crm: 450,
		complex: 700,
		shop: 250,
		parser: 100,
		mobile: 500,
	}
	const baseWeeks: Record<string, number> = {
		landing: 1,
		bot: 1.5,
		crm: 4,
		complex: 6,
		shop: 2.5,
		parser: 1,
		mobile: 5,
	}
	const complexityMult = { simple: 0.8, medium: 1, complex: 1.35 }[complexity]

	let total = basePrices[type] + (pages > 1 ? (pages - 1) * 20 : 0) 
	if (['crm', 'complex', 'mobile'].includes(type)) total += (roles - 1) * 60 
	if (['bot', 'parser'].includes(type)) total += integrations * 60 
	Object.entries(extras).forEach(([key, val]) => {
		if (val) total += extraPrices[key] ?? 0
	})
	total *= complexityMult
	if (urgent) total *= 1.25

	const totalLow = Math.round((total * 0.9) / 10) * 10
	const totalHigh = Math.round((total * 1.15) / 10) * 10

	const format = (v: number) =>
		currency === 'usd' ? `$${v}` : `${Math.round((v * UAH_RATE) / 100) * 100} ₴`

	const weeksLow = Math.max(1, Math.round(baseWeeks[type] * complexityMult))
	const weeksHigh = Math.max(
		weeksLow + 1,
		Math.round(baseWeeks[type] * complexityMult * 1.6),
	)

	const finalLow = urgent ? Math.max(1, Math.round(weeksLow * 0.6)) : weeksLow
	let finalHigh = urgent ? Math.max(1, Math.round(weeksHigh * 0.6)) : weeksHigh
	if (finalHigh <= finalLow) finalHigh = finalLow + 1

	const weeksText = `${finalLow}-${finalHigh}`
	const handleSendQuote = () => {
		const summary = `Тип: ${t.calcModal.types[type as keyof typeof t.calcModal.types]}
		Складність: ${complexity}
		Терміновість: ${urgent ? 'Терміново' : 'Стандартно'}
		Орієнтовна вартість: ${format(totalLow)} - ${format(totalHigh)}
		Термін: ${weeksText} тиж.`
		window.location.href = `mailto:commercialdevr@gmail.com?subject=${encodeURIComponent(
			'Запит на розрахунок вартості',
		)}&body=${encodeURIComponent(summary)}`
	}

	const pillBtn = (active: boolean) =>
		`px-3.5 py-2 rounded-full text-xs font-sans uppercase tracking-widest transition-all border ${
			active
				? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
				: 'bg-white/50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-cyan-300'
		}`

	return (
		<div
			className='fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity'
			onClick={onClose}
		>
			<div
				className='bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-3xl w-full max-w-lg border border-zinc-200 dark:border-zinc-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex justify-between items-center p-6 border-b border-zinc-100 dark:border-zinc-800'>
					<h2 className='text-xl font-serif text-zinc-900 dark:text-white flex items-center gap-3'>
						<Calculator className='text-cyan-500' /> {t.calcModal.title}
					</h2>
					<button
						onClick={onClose}
						className='p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
					>
						<X size={20} />
					</button>
				</div>

				<div className='flex items-center justify-center gap-2 pt-5 pb-1'>
					{[1, 2, 3].map(s => (
						<span
							key={s}
							className={`h-1.5 rounded-full transition-all ${
								s === step
									? 'w-8 bg-cyan-500'
									: s < step
										? 'w-4 bg-cyan-300 dark:bg-cyan-700'
										: 'w-4 bg-zinc-200 dark:bg-zinc-700'
							}`}
						/>
					))}
				</div>

				<div className='p-6 overflow-y-auto no-scrollbar flex flex-col gap-6 font-sans'>
					{step === 1 && (
						<>
							<div>
								<label className='text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3 block'>
									{t.calcModal.type}
								</label>
								<div className='relative'>
									<select
										value={type}
										onChange={e => setType(e.target.value)}
										className='w-full p-3 pr-10 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 text-sm text-zinc-800 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none cursor-pointer'
									>
										<option value='landing'>{t.calcModal.types.landing}</option>
										<option value='bot'>{t.calcModal.types.bot}</option>
										<option value='crm'>{t.calcModal.types.crm}</option>
										<option value='complex'>{t.calcModal.types.complex}</option>
										<option value='shop'>{t.calcModal.types.shop}</option>
										<option value='parser'>{t.calcModal.types.parser}</option>
										<option value='mobile'>{t.calcModal.types.mobile}</option>
									</select>
									<ChevronDown
										size={16}
										className='pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-cyan-500'
									/>
								</div>
							</div>

							<div>
								<label className='text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3 block'>
									{t.calcModal.complexity}
								</label>
								<div className='flex gap-2 flex-wrap'>
									<button
										type='button'
										onClick={() => setComplexity('simple')}
										className={pillBtn(complexity === 'simple')}
									>
										{t.calcModal.simple}
									</button>
									<button
										type='button'
										onClick={() => setComplexity('medium')}
										className={pillBtn(complexity === 'medium')}
									>
										{t.calcModal.medium}
									</button>
									<button
										type='button'
										onClick={() => setComplexity('complex')}
										className={pillBtn(complexity === 'complex')}
									>
										{t.calcModal.complexLevel}
									</button>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<label className='text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400'>
									{t.calcModal.urgency}
								</label>
								<button
									type='button'
									onClick={() => setUrgent(u => !u)}
									className={pillBtn(urgent)}
								>
									{urgent ? t.calcModal.urgentLabel : t.calcModal.standard}
								</button>
							</div>

							<div className='flex items-center justify-between'>
								<label className='text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400'>
									{t.calcModal.currency}
								</label>
								<div className='flex gap-2'>
									<button
										type='button'
										onClick={() => setCurrency('usd')}
										className={pillBtn(currency === 'usd')}
									>
										$
									</button>
									<button
										type='button'
										onClick={() => setCurrency('uah')}
										className={pillBtn(currency === 'uah')}
									>
										₴
									</button>
								</div>
							</div>
						</>
					)}

					{step === 2 && (
						<>
							{(type === 'landing' ||
								type === 'complex' ||
								type === 'shop' ||
								type === 'mobile') && (
								<div>
									<div className='flex justify-between text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3'>
										<span>
											{type === 'shop'
												? t.calcModal.pagesShop
												: type === 'mobile'
													? t.calcModal.pagesMobile
													: t.calcModal.pages}
										</span>
										<span className='font-medium text-cyan-600 dark:text-cyan-400'>
											{pages}
										</span>
									</div>
									<input
										type='range'
										min='1'
										max='20'
										value={pages}
										onChange={e => setPages(Number(e.target.value))}
										className='w-full accent-cyan-500'
									/>
								</div>
							)}

							{(type === 'crm' || type === 'complex' || type === 'mobile') && (
								<div>
									<div className='flex justify-between text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3'>
										<span>{t.calcModal.roleCount}</span>
										<span className='font-medium text-cyan-600 dark:text-cyan-400'>
											{roles}
										</span>
									</div>
									<input
										type='range'
										min='1'
										max='5'
										value={roles}
										onChange={e => setRoles(Number(e.target.value))}
										className='w-full accent-cyan-500'
									/>
								</div>
							)}

							{(type === 'bot' || type === 'parser') && (
								<div>
									<div className='flex justify-between text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3'>
										<span>
											{type === 'parser'
												? t.calcModal.sourceCount
												: t.calcModal.integrationCount}
										</span>
										<span className='font-medium text-cyan-600 dark:text-cyan-400'>
											{integrations}
										</span>
									</div>
									<input
										type='range'
										min='0'
										max='5'
										value={integrations}
										onChange={e => setIntegrations(Number(e.target.value))}
										className='w-full accent-cyan-500'
									/>
								</div>
							)}

							<div>
								<label className='text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-3 block'>
									{t.calcModal.extras}
								</label>
								<div className='flex flex-col gap-3'>
									{Object.entries(t.calcModal.options)
										.filter(([key]) => extraVisibility[type].includes(key))
										.map(([key, label]) => (
											<CheckboxItem
												key={key}
												checked={extras[key as keyof typeof extras]}
												onChange={v => setExtras({ ...extras, [key]: v })}
												label={label}
											/>
										))}
									<CheckboxItem
										checked={extras.hosting}
										onChange={v => setExtras({ ...extras, hosting: v })}
										label={t.calcModal.deploy}
									/>
									<CheckboxItem
										checked={extras.support}
										onChange={v => setExtras({ ...extras, support: v })}
										label={t.calcModal.support}
									/>
								</div>
							</div>
						</>
					)}

					{step === 3 && (
						<>
							<div className='p-5 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-800 flex flex-col gap-1'>
								<span className='text-sm font-medium text-cyan-800 dark:text-cyan-400'>
									{t.calcModal.total}
								</span>
								<span className='text-2xl font-serif text-cyan-600 dark:text-cyan-300'>
									~ {format(totalLow)} – {format(totalHigh)}
								</span>
								<span className='text-xs text-cyan-700/70 dark:text-cyan-400/70 mt-1'>
									{t.calcModal.weeksLabel} {weeksText} {t.calcModal.weeksSuffix}
								</span>
							</div>
							<p className='text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed'>
								{t.calcModal.disclaimer}
							</p>
							<button
								type='button'
								onClick={handleSendQuote}
								className='self-center flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-sans uppercase tracking-widest shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300'
							>
								<Mail size={14} /> {t.calcModal.sendToEmail}
							</button>
						</>
					)}
				</div>

				<div className='flex justify-between items-center p-6 border-t border-zinc-100 dark:border-zinc-800'>
					<button
						type='button'
						onClick={() => setStep(s => Math.max(1, s - 1))}
						disabled={step === 1}
						className='flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 disabled:opacity-0 transition-colors'
					>
						<ChevronLeft size={16} /> {t.calcModal.back}
					</button>
					{step < 3 && (
						<button
							type='button'
							onClick={() => setStep(s => Math.min(3, s + 1))}
							className='flex items-center gap-1.5 px-5 py-2 rounded-full bg-cyan-500 text-white text-xs font-sans uppercase tracking-widest shadow-sm hover:bg-cyan-600 transition-colors'
						>
							{t.calcModal.next} <ChevronRight size={16} />
						</button>
					)}
				</div>
			</div>
		</div>
	)
}
