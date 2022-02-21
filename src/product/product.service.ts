import { Injectable } from '@nestjs/common'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { ReviewModel } from 'src/review/review.model'

import { CreateProductDto } from './dto/create-product.dto'
import { FindProductDTO } from './dto/find-product.dto'
import { ProductModel } from './product.model'

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto)
	}

	async findById(_id: string) {
		return this.productModel.findById(_id).exec()
	}

	async deleteById(_id: string) {
		return this.productModel.findByIdAndDelete(_id).exec()
	}

	async updateById(_id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(_id, dto, { new: true }).exec()
	}

	async findWithReviews({ category, limit }: FindProductDTO) {
		return this.productModel
			.aggregate<ProductModel & { review: ReviewModel[]; reviewCount: number; reviewAvg: number }>([
				{ $match: { categories: category } },
				{ $sort: { _id: 1 } },
				{ $limit: limit },
				{ $lookup: { from: 'Review', as: 'reviews', localField: '_id', foreignField: 'productId' } },
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
						reviews: {
							$function: {
								body: `function (reviews) {
									return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								}`,
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec()
	}
}
