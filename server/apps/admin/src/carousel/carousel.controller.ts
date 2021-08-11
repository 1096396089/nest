import { Carousel } from '@libs/db/models/carousel.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';


@Crud({
    model:Carousel
})
@ApiTags("轮播图")
@UseGuards(AuthGuard('jwt'))
@Controller('carousel')
export class CarouselController {
    @InjectModel(Carousel) private readonly model: ReturnModelType<typeof Carousel>



    @Get('option')
    option(){
        return{
            index: true,
            indexLabel:'序号',
            title:'轮播图管理',
            align:'center',
            translate:false,
            column:[
                { prop : "name" ,label:'名称',sortable:true,search:'ture',regex:true,row:true,span:24},
                { prop: "cover", label: "图片", type: 'upload', row: true, action: 'upload', multiple: true, listType: 'picture-card'},
            ]
        }
    }
}
