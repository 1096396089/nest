import { Resource } from '@libs/db/models/resource.model';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model:Resource,
    routes:{
        create:false,
        update:false,
        delete:false
    }  
})

@ApiTags('图片资源')

@Controller('resource')
export class ResourceController {
    constructor(
        @InjectModel(Resource) private readonly model:ReturnModelType<typeof Resource>
    ){}

     //1  型录1     2  型录2   3  型录3  4  产品  5  插画

     @ApiOperation({summary:'首页图片'})
     @Get('resour')
     async resour(){
         const xl1 = await this.model.find({'info':'1'})
         const xl2 = await this.model.find({'info':'2'})
         const xl3 = await this.model.find({'info':'3'})
         const cp = await this.model.find({'info':'4'})
         const ch = await this.model.find({'info':'5'})

         return {xl1,xl2,xl3,cp,ch}
     }
     
}
