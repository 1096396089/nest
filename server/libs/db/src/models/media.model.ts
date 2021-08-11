import { ApiProperty } from "@nestjs/swagger";
import { prop, Ref } from "@typegoose/typegoose";


export class Media {
    @ApiProperty({description:'视频名称'})
    @prop()
    name: string

    @ApiProperty({description:'文件'})
    @prop()
    file: string

    @ApiProperty({ description: '发布时间' })
    @prop()
    publishtime: string
    // @prop({ref :'Course'})
    // course : Ref<Course>
}