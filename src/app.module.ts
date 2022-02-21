import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypegooseModule } from 'nestjs-typegoose'

import { AuthModule } from './auth/auth.module'
import { getMongoConfig } from './configs/mongo.config'
import { PageModule } from './page/page.module'
import { ProductModule } from './product/product.module'
import { ReviewModule } from './review/review.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypegooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		AuthModule,
		PageModule,
		ProductModule,
		ReviewModule,
	],
})
export class AppModule {}
