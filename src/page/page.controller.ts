import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'

import { FindPageDTO } from './dto/find-page.dto'
import { PageModel } from './page.model'

@Controller('page')
export class PageController {
	@Post('create')
	async create(@Body() dto: Omit<PageModel, '_id'>) {
		console.log('create', dto)
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		console.log('get', id)
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: PageModel) {
		console.log('update', dto)
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		console.log('delete', id)
	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindPageDTO) {
		console.log('find', dto)
	}
}
