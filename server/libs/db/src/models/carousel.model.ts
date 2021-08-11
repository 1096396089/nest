import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";

export class Carousel {
    @ApiProperty({description:'轮播图名字'})
    @prop()
    name: string


    @ApiProperty({description:'文件'})
    @prop()
    cover:string[]
}