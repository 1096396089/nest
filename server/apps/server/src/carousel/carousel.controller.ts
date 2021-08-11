import { Carousel } from '@libs/db/models/carousel.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model:Carousel,
    routes:{
        create:false,
        update:false,
        delete:false,
    }
})
@ApiTags('轮播图')
@Controller('carousel')
export class CarouselController {
    constructor(
        @InjectModel(Carousel) private readonly model:ReturnModelType<typeof Carousel>
    ){ }
}
