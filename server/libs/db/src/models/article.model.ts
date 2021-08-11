import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { Category } from './category.model'

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON :{virtuals:true}
    }

})
export class Article {
    @ApiProperty({ description: '标题' })
    @prop()
    title: string

    @ApiProperty({ description: '分类' })
    // @prop({ref :'Course'})
    // course : Ref<Course>
    @prop({ref:'Category'})
    category:Ref<Category>

    @ApiProperty({ description: '状态' })
    @prop()
    release: string

    @ApiProperty({ description: '封面图' })
    @prop()
    image: string

    @ApiProperty({ description: '文章内容' })
    @prop()
    body: string

    @ApiProperty({ description: '作者' })
    @prop()
    author: string

    @ApiProperty({ description: '发布时间' })
    @prop()
    publishtime: string
}