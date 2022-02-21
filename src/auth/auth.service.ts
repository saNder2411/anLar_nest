import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { compare, genSalt, hash } from 'bcryptjs'
import { InjectModel } from 'nestjs-typegoose'

import { USER_NOT_FOUND_ERROR, USER_NOT_VALID_PASSWORD_ERROR } from './auth.constants'
import { AuthDTO } from './dto/auth.dto'
import { UserModel } from './user.model'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService,
	) {}

	async createUser({ email, password }: AuthDTO) {
		const salt = await genSalt(7)
		const passwordHash = await hash(password, salt)
		const newUser = new this.userModel({ email, passwordHash })

		return newUser.save()
	}

	async findUser(email: string) {
		return this.userModel.findOne({ email }).exec()
	}

	async validateUser({ email, password }: AuthDTO) {
		const user = await this.findUser(email)

		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
		}

		const isValidPassword = await compare(password, user.passwordHash)

		if (!isValidPassword) {
			throw new UnauthorizedException(USER_NOT_VALID_PASSWORD_ERROR)
		}

		return { email: user.email }
	}

	async login(email: string) {
		const payload = { email }
		const accessToken = await this.jwtService.signAsync(payload)

		return { accessToken }
	}
}
