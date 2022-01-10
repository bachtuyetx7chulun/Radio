import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsString, Matches } from 'class-validator'

export class PostVideosIds {
  @IsArray()
  @ArrayNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]{11}$/, { each: true, message: 'Id is not valid' })
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    example: ['yH88qRmgkGI', 'Il0S8BoucSA', 'orJSJGHjBLI'],
  })
  video_ids: string[]
}

export class PostVideosId {
  @Matches(/^[a-zA-Z0-9_-]{11}$/, { each: true, message: 'Id is not valid' })
  @IsString({ each: true })
  @ApiProperty({
    type: String,
    example: 'yH88qRmgkGI',
  })
  video_id: string
}
