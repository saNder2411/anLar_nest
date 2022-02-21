import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { disconnect } from 'mongoose'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'
import { AuthDTO } from '../src/auth/dto/auth.dto'

const loginDto: AuthDTO = {
	email: 'email2@gmail.com',
	password: '1234',
}

describe('AuthController (e2e)', () => {
	let app: INestApplication
	let createdId: string
	let accessToken: string

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/auth/login (POST) - success', (done) => {
		request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200)
			.then(({ body }: request.Response) => {
				accessToken = body.accessToken
				expect(body).toEqual({ accessToken })
				done()
			})
	})

	it('/auth/login (POST) - fail password', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '1' })
			.expect(401, {
				statusCode: 401,
				message: 'Password is not valid',
				error: 'Unauthorized',
			})
	})

	it('/auth/login (POST) - fail email', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, email: 'a@gmail.com' })
			.expect(401, {
				statusCode: 401,
				message: 'User is not found',
				error: 'Unauthorized',
			})
	})

	afterAll(() => {
		disconnect()
	})
})
