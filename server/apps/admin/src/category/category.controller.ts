import { Category } from '@libs/db/models/category.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType} from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model:Category
})

@Controller('category')
@ApiTags('文章分类管理')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
    @InjectModel(Category) private readonly model: ReturnModelType<typeof Category >

    @Get('option')
    option(){
        return{
            index: true,
            indexLabel:'序号',
            title:'文章分类管理',
            align:'center',
            translate:false,
            column:[
                { prop : "name" ,label:'名称',sortable:true,search:'ture',regex:true,row:true,span:24},
                
            ]
        }
    }
}
