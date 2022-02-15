export const enum LevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class PageModel {
	_id: string
	firstCategory: LevelCategory
	secondCategory: string
	title: string
	category: string
	hh?: { count: number; juniorSalary: number; middleSalary: number; seniorSalary: number }
	advantages: { title: string; description: string }[]
	seoText: string
	tagsTitle: string
	tags: string[]
}
