import { ApiProperty } from "@nestjs/swagger";
import { prop, Ref } from "@typegoose/typegoose";

export class Episode {
    @ApiProperty({description:'课时名称'})
    @prop()
    name: string

    @ApiProperty({description:'文件'})
    @prop()
    file: string

    // @prop({ref :'Course'})
    // course : Ref<Course>
}