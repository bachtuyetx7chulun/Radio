import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsString, Matches } from 'class-validator'

export class PostVideosIds {
  @IsArray()
  @ArrayNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]{11}$/, { each: true })
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    example: ['1', '2', '3'],
  })
  video_ids: string[]
}
