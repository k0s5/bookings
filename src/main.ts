import { NestFactory } from '@nestjs/core'
import { AppModule } from '@core/app/app.module'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '@config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService<EnvironmentVariables>)

  await app.listen(configService.getOrThrow('BK_API_PORT'))
}
bootstrap()
