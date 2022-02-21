import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'

import { IdValidationPipe } from '../pipes/id-validation.pipe'
import { CreatePageDto } from './dto/create-page.dto'
import { FindPageDTO } from './dto/find-page.dto'
import { PAGE_NOT_FOUND_ERROR } from './page.constants'
import { PageService } from './page.service'

@Controller('page')
export class PageController {
	constructor(private readonly pageService: PageService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreatePageDto) {
		return this.pageService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.pageService.findById(id)
		if (!page) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR)
		}

		return page
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const page = await this.pageService.findByAlias(alias)
		if (!page) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR)
		}

		return page
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedPage = await this.pageService.deleteById(id)
		if (!deletedPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR)
		}

		return deletedPage._id
	}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreatePageDto) {
		const updatedPage = await this.pageService.updateById(id, dto)
		if (!updatedPage) {
			throw new NotFoundException(PAGE_NOT_FOUND_ERROR)
		}

		return updatedPage
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async findByCategory(@Body() dto: FindPageDTO) {
		return this.pageService.findByCategory(dto)
	}
}
