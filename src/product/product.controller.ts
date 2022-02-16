import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'

import { FindProductDTO } from './dto/find-product.dto'
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

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: ProductModel) {
		console.log('update', dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		console.log('delete', id)
	}

	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDTO) {
		console.log('find', dto)
	}
}
