import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { disconnect, Types } from 'mongoose'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'
import { AuthDTO } from '../src/auth/dto/auth.dto'
import { CreateReviewDTO } from '../src/review/dto/create-review.dto'
import { REVIEW_NOT_FOUND } from '../src/review/review.constants'

const productId = new Types.ObjectId().toHexString()

const loginDto: AuthDTO = {
	email: 'email2@gmail.com',
	password: '1234',
}

const testDto: CreateReviewDTO = {
	name: 'Name',
	title: 'Title',
	description: 'Description',
	rating: 5,
	productId,
}

describe('ReviewController (e2e)', () => {
	let app: INestApplication
	let createdId: string
	let accessToken: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()

		const { body } = await request(app.getHttpServer()).post('/auth/login').send(loginDto)
		accessToken = body.accessToken
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
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1)
				done()
			})
	})

	it('/review/byProductId/:productId (GET) - fail', (done) => {
		request(app.getHttpServer())
			.get(`/review/byProductId/${new Types.ObjectId().toHexString()}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0)
				done()
			})
	})

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete(`/review/${createdId}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200)
	})

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete(`/review/${new Types.ObjectId().toHexString()}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(404, { statusCode: 404, message: REVIEW_NOT_FOUND })
	})

	afterAll(() => {
		disconnect()
	})
})
