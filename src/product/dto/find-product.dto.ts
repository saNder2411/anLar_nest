import { IsString, IsNumber } from 'class-validator'

export class FindProductDTO {
	@IsString()
	category: string

	@IsNumber()
	limit: number
}
