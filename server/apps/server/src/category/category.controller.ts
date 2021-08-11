import { Category } from '@libs/db/models/category.model';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model:Category,
    routes:{
        create:false,
        update:false,
        delete:false,
    }
})
@ApiTags('分类')
@Controller('category')
export class CategoryController {
    constructor(
        @InjectModel(Category) private readonly model:ReturnModelType<typeof Category>
    ){ }
}
