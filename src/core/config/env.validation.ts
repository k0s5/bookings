import { BadRequestException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator'

export class EnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  BK_POSTGRES_DB_NAME: string
  BK_POSTGRES_USER: string
  BK_POSTGRES_PASSWORD: string
  BK_POSTGRES_URI: string
  BK_REDIS_USER: string
  BK_REDIS_PASSWORD: string

  @IsNotEmpty()
  @IsNumber()
  BK_API_PORT: number
  BK_POSTGRES_EXTERNAL_PORT: number
  BK_POSTGRES_INTERNAL_PORT: number
  BK_REDIS_EXTERNAL_PORT: number
  BK_REDIS_INTERNAL_PORT: number
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false
  })

  if (errors.length > 0) {
    throw new BadRequestException(errors.toString())
  }

  return validatedConfig
}
