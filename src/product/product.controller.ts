import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ProductModel } from './product.model'

@Controller('product')
export class ProductController {
	@Post('create')
	async create(@Body() dto: Omit<ProductModel, '_id'>) {
		console.log('create', dto)
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		console.log('get', id)
	}

	@Post()
	async update(@Body() dto: ProductModel) {
		console.log('update', dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		console.log('delete', id)
	}
}
