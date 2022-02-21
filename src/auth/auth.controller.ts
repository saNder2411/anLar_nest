import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ALREADY_REGISTERED_ERROR } from './auth.constants'

import { AuthService } from './auth.service'
import { AuthDTO } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDTO) {
		const existingUser = await this.authService.findUser(dto.email)

		if (existingUser) {
			throw new BadRequestException(ALREADY_REGISTERED_ERROR)
		}

		return this.authService.createUser(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDTO) {
		const { email } = await this.authService.validateUser(dto)

		return this.authService.login(email)
	}
}
