import { ApiProperty } from '@nestjs/swagger'
import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }

})
export class Resource {
    @ApiProperty({ description: '名字' })
    @prop()
    title: string

    @prop()
    cover:string[]

    @ApiProperty({description:'所属方块'})
    @prop()
    info:string
    
}