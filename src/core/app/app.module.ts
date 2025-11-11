import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from '@core/prisma'
import { ConfigModule } from '@nestjs/config'
import { BookingModule } from '@modules/booking/booking.module'
import { EventModule } from '@modules/event/event.module'
import { IS_DEV } from '@utils'
import { validate } from '@config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      ignoreEnvFile: !IS_DEV,
      envFilePath: ['.env.development'],
      validate
    }),
    PrismaModule,
    BookingModule,
    EventModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
