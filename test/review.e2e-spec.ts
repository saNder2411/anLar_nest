import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { disconnect, Types } from 'mongoose'
import { CreateReviewDTO } from '../src/review/dto/create-review.dto'
import { REVIEW_NOT_FOUND } from '../src/review/review.constants'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'

const productId = new Types.ObjectId().toHexString()

const testDto: CreateReviewDTO = {
	name: 'Name',
	title: 'Title',
	description: 'Description',
	rating: 5,
	productId,
}

describe('AppController (e2e)', () => {
	let app: INestApplication
	let createdId: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/review/create (POST) - success', (done) => {
		request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id
				expect(createdId).toBeDefined()
				done()
			})
	})

	it('/review/create (POST) - fail', (done) => {
		request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400)
			.then(({ body }: request.Response) => {
				console.log(body)
				expect(createdId).toBeDefined()
				done()
			})
	})

	it('/review/byProductId/:productId (GET) - success', (done) => {
		request(app.getHttpServer())
			.get(`/review/byProductId/${productId}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1)
				done()
			})
	})

	it('/review/byProductId/:productId (GET) - fail', (done) => {
		request(app.getHttpServer())
			.get(`/review/byProductId/${new Types.ObjectId().toHexString()}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0)
				done()
			})
	})

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer()).delete(`/review/${createdId}`).expect(200)
	})

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete(`/review/${new Types.ObjectId().toHexString()}`)
			.expect(404, { statusCode: 404, message: REVIEW_NOT_FOUND })
	})

	afterAll(() => {
		disconnect()
	})
})
