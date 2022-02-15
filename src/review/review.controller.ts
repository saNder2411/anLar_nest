import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { ReviewModel } from './review.model'

@Controller('review')
export class ReviewController {
	@Post('create')
	async create(@Body() dto: Omit<ReviewModel, '_id'>) {
		console.log('create', dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		console.log('delete', id)
	}

	@Get('byProductId/:productId')
	async getByProductId(@Param('productId') productId: string) {
		console.log('delete', productId)
	}
}
