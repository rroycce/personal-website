import { FaqItem } from './faq'
import { PrincipleItem } from './principles'
import { TimelineItem } from './timeline'
import { ProjectData } from './project'

export interface Dictionary {
	heroTitle: string
	heroDesc: string
	available: string
	resume: string
	faq: string
	calc: string
	stats: {
		projects: string
		experience: string
		tech: string
	}
	path: string
	principles: string
	portfolio: string
	contact: {
		title: string
		name: string
		email: string
		message: string
		send: string
	}
	footer: string
	copied: string
	cookie: {
		text: string
		accept: string
	}
	calcModal: {
		title: string
		type: string
		pages: string
		extras: string
		total: string
		types: {
			landing: string
			crm: string
			bot: string
			complex: string
		}
		options: {
			design: string
			db: string
			seo: string
		}
	}
	quote: {
		text: string
		sub: string
		author: string
	}
}
