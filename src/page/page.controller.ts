import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { FindPageDTO } from './dto/find-page.dto'
import { PageModel } from './page.model'

@Controller('page')
export class PageController {
	// constructor(private readonly configService: ConfigService) {}

	@Get('get/:alias')
	async get(@Param('alias') alias: string) {
		console.log('get', alias)
	}

	@HttpCode(200)
	@Post('find')
	async getByCategory(@Body() dto: FindPageDTO) {
		console.log('find', dto)
	}

	@Post('save')
	async save(@Body() dto: Omit<PageModel, '_id'>) {
		console.log('create', dto)
	}

	@Delete('delete')
	async delete(@Body() dto: Omit<PageModel, '_id'>) {
		console.log('delete', dto)
	}
}
