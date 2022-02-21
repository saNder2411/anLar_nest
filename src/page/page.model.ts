import { prop, index } from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'

export enum LevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

class HHData {
	@prop()
	count: number

	@prop()
	juniorSalary: number

	@prop()
	middleSalary: number

	@prop()
	seniorSalary: number
}

class PageAdvantage {
	@prop()
	title: string

	@prop()
	description: string
}

export interface PageModel extends Base {}

@index({ '$**': 'text' })
export class PageModel extends TimeStamps {
	@prop({ enum: LevelCategory })
	firstCategory: LevelCategory

	@prop()
	secondCategory: string

	@prop({ unique: true })
	alias: string

	@prop()
	title: string

	@prop()
	metaTitle: string

	@prop()
	metaDescription: string

	@prop()
	category: string

	@prop({ type: () => HHData })
	hh?: HHData

	@prop({ type: () => [PageAdvantage], _id: false })
	advantages: PageAdvantage[]

	@prop()
	seoText: string

	@prop()
	tagsTitle: string

	@prop({ type: () => [String] })
	tags: string[]
}
