import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'

import { CreatePageDto } from './dto/create-page.dto'
import { FindPageDTO } from './dto/find-page.dto'
import { PageModel } from './page.model'

@Injectable()
export class PageService {
	constructor(@InjectModel(PageModel) private readonly pageModel: ModelType<PageModel>) {}

	async create(dto: CreatePageDto) {
		return this.pageModel.create(dto)
	}

	async findById(_id: string) {
		return this.pageModel.findById(_id).exec()
	}

	async findByAlias(alias: string) {
		return this.pageModel.findOne({ alias }).exec()
	}

	async findByCategory({ firstCategory }: FindPageDTO) {
		return (
			this.pageModel
				.aggregate()
				.match({ firstCategory })
				.group({ _id: '$secondCategory', pages: { $push: { alias: '$alias', title: '$title' } } })
				// .aggregate([
				// 	{ $match: { firstCategory } },
				// 	{ $group: { _id: '$secondCategory', pages: { $push: { alias: '$alias', title: '$title' } } } },
				// ])
				.exec()
		)
	}

	async findByText(text: string) {
		return this.pageModel.find({ $text: { $search: text, $caseSensitive: false } }).exec()
	}

	async deleteById(_id: string) {
		return this.pageModel.findByIdAndDelete(_id).exec()
	}

	async updateById(_id: string, dto: CreatePageDto) {
		return this.pageModel.findByIdAndUpdate(_id, dto, { new: true }).exec()
	}
}
