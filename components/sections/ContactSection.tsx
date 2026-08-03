'use client'

import { useState } from 'react'
import { Send, Calculator } from 'lucide-react'
import { useLanguage } from '@/components/providers/LanguageProvider'

export const ContactSection = ({
	onCalcClick,
}: {
	onCalcClick: () => void
}) => {
	const { t } = useLanguage()
	const [form, setForm] = useState({ name: '', email: '', message: '' })
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
		'idle',
	)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus('sending')
		try {
			const res = await fetch('https://formspree.io/f/mojgpedj', {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: JSON.stringify(form),
			})
			if (res.ok) {
				setStatus('sent')
				setForm({ name: '', email: '', message: '' })
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	return (
		<section className='relative w-full mb-20 animate-fade-in-up'>
			<div className='bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-10 border border-zinc-200 dark:border-zinc-700 shadow-sm max-w-2xl mx-auto'>
				<p className='text-center text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-sans font-light mb-5 md:mb-8 leading-relaxed'>
					{t.contact.title}
				</p>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-3 md:gap-4 font-sans'
				>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
						<input
							type='text'
							name='name'
							required
							value={form.name}
							onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
							placeholder={t.contact.name}
							className='px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/50 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all'
						/>
						<input
							type='email'
							name='email'
							required
							value={form.email}
							onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
							placeholder={t.contact.email}
							className='px-3.5 py-2.5 md:px-4 md:py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/50 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all'
						/>
					</div>
					<textarea
						name='message'
						required
						rows={3}
						value={form.message}
						onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
						placeholder={t.contact.message}
						className='px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/50 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all resize-none'
					/>
					<div className='flex flex-wrap items-center justify-center gap-3 mt-2'>
						<button
							type='submit'
							disabled={status === 'sending'}
							className='group flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 rounded-full bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[11px] md:text-xs font-sans uppercase tracking-widest shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0'
						>
							<Send
								size={14}
								className='group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform'
							/>{' '}
							{status === 'sending' ? '...' : t.contact.send}
						</button>
						<button
							type='button'
							onClick={onCalcClick}
							className='group flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-cyan-200 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/20 text-[11px] md:text-xs font-sans uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-cyan-700 dark:hover:text-cyan-400 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm'
						>
							<Calculator
								size={14}
								className='group-hover:rotate-12 transition-transform'
							/>
							{t.calc}
						</button>
					</div>
					{status === 'sent' && (
						<p className='text-center text-xs text-emerald-600 dark:text-emerald-400 font-sans mt-2'>
							Дякую! Повідомлення надіслано.
						</p>
					)}
					{status === 'error' && (
						<p className='text-center text-xs text-red-500 font-sans mt-2'>
							Щось пішло не так. Спробуйте ще раз або напишіть на
							commercialdevr@gmail.com
						</p>
					)}
				</form>
			</div>
		</section>
	)
}
