import { Resource } from '@libs/db/models/resource.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
    model: Resource
})
@ApiTags('图片资源')
@UseGuards(AuthGuard("jwt"))
@Controller('resource')
export class ResourceController {
    constructor(
        @InjectModel(Resource) private readonly model: ReturnModelType<typeof Resource>
    ) { }



    @Get('option')
    option() {
        return {
            index: true,
            indexLabel: '序号',
            title: "资源管理",
            align: 'center',
            translate: false,
            column: [
                { prop: "title", label: "名称", sortable: true, search: true, regex: true, row: true, span: 24, searchTip: '名称', },
                { prop: "cover", label: "图片", type: 'upload', row: true, action: 'upload', multiple: true, drag: true, },
                {
                    prop: "info", label: "方块", row: true, type: 'select', dicData: [
                        {
                            label: "型录1",
                            value: "1"
                        },
                        {
                            label: '型录2',
                            value: '2'
                        },
                        {
                            label: '型录3',
                            value: '3'
                        },
                        {
                            label: '产品',
                            value: '4'
                        },
                        {
                            label: '插画',
                            value: '5'
                        },
                        {
                            label: "下线",
                            value: '0'
                        }
                       
                    ],
                }
            ],
        }
    }
}
