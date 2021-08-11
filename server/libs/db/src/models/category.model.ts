import { ApiProperty } from "@nestjs/swagger";
import { prop } from "@typegoose/typegoose";

export class Category {
    @ApiProperty({description:'分类名字'})
    @prop()
    name: string
}