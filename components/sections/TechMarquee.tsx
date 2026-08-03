'use client'

import { TECH_LIST } from '@/data/db'

export const TechMarquee = () => (
	<div className='w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden border-y border-zinc-200/60 dark:border-zinc-700/60 py-4 md:py-5 animate-fade-in-up delay-200 bg-white/20 dark:bg-zinc-800/20 backdrop-blur-md'>
		<div className='animate-marquee flex gap-8 md:gap-12 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium items-center'>
			{[...TECH_LIST, ...TECH_LIST].map((tech, i) => (
				<span
					key={i}
					className='flex items-center gap-8 md:gap-12 cursor-default'
				>
					<span className='bg-clip-text text-transparent bg-gradient-to-r from-emerald-500/80 via-cyan-500/80 to-blue-500/80 hover:opacity-100 transition-opacity duration-300'>
						{tech}
					</span>
					<span className='w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600' />
				</span>
			))}
		</div>
	</div>
)
