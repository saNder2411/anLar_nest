import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common'

import { AuthDTO } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDTO) {
		console.log('register', dto)
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDTO) {
		console.log('login', dto)
	}
}
