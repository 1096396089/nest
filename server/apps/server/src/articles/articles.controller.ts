import { Article } from '@libs/db/models/article.model';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model:Article,
    routes:{
        create:false,
        update:false,
        delete:false,
    }
})
@ApiTags('文章')
@Controller('articles')
export class ArticlesController {
    constructor(
        @InjectModel(Article) private readonly model: ReturnModelType<typeof Article>,
        
    ){}

    
    
    @Get('rdarticles')
    @ApiOperation({summary:'随机文章'})
    async rdarticles(){
        const data = (
            await this.model.aggregate([
                {$sample:{size:5}},
                {$match:{release:'1'}}
            ])
        ).map(v =>({
            image:v.image,
            _id:v._id,
            title:v.title,
            publishtime:v.publishtime,
            category:v.category
        }))
        return data
    }
    
}
