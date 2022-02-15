import { Controller, HttpCode, Post, Body } from '@nestjs/common'
import { AuthDTO } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
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
