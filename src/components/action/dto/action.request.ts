import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator'

export class PostVideoIds {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    example: ['1', '2', '3'],
  })
  video_ids: string[]
}
