import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

import { LevelCategory } from '../page.model'

class HHDataDto {
	@IsNumber()
	count: number

	@IsNumber()
	juniorSalary: number

	@IsNumber()
	middleSalary: number

	@IsNumber()
	seniorSalary: number
}

class PageAdvantageDto {
	@IsString()
	title: string

	@IsString()
	description: string
}

export class CreatePageDto {
	@IsEnum(LevelCategory)
	firstCategory: LevelCategory

	@IsString()
	secondCategory: string

	@IsString()
	alias: string

	@IsString()
	title: string

	@IsString()
	metaTitle: string

	@IsString()
	metaDescription: string

	@IsString()
	category: string

	@IsOptional()
	@ValidateNested()
	@Type(() => HHDataDto)
	hh?: HHDataDto

	@IsArray()
	@ValidateNested()
	@Type(() => PageAdvantageDto)
	advantages: PageAdvantageDto[]

	@IsString()
	seoText: string

	@IsString()
	tagsTitle: string

	@IsArray()
	@IsString({ each: true })
	tags: string[]
}
