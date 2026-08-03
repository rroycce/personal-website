import { ProjectData } from './project'
import { TimelineItem } from './timeline'
import { PrincipleItem } from './principles'
import { FaqItem } from './faq'

export interface Database {
	categories: string[]
	projects: ProjectData[]
	timeline: TimelineItem[]
	principles: PrincipleItem[]
	faq: FaqItem[]
}
