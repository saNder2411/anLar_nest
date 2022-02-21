import { IsEnum } from 'class-validator'
import { LevelCategory } from '../page.model'

export class FindPageDTO {
	@IsEnum(LevelCategory)
	firstCategory: LevelCategory
}
