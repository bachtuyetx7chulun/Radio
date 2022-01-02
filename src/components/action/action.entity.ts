import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator'

export class ActionEntity {
  @IsInt()
  id: number

  @IsString()
  name: string

  @IsString()
  content: string

  @IsBoolean()
  isActive: boolean

  @IsString()
  ipPublic: string

  @IsDate()
  createdAt: Date

  @IsDate()
  updatedAt: Date

  @IsBoolean()
  isSend?: boolean
}
