import { Media } from '@libs/db/models/media.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';



@Crud({
    model:Media,
    routes:{
        create:false,
        update:false,
        delete:false,
    }
})
@ApiTags('视频文件')
@Controller('media')
export class MediaController {
    constructor(
        @InjectModel(Media) private readonly model: ReturnModelType<typeof Media>
    ) { }
}
