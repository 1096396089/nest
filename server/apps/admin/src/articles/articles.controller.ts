import { Article } from '@libs/db/models/article.model';
import { Category } from '@libs/db/models/category.model';
import { Controller, Get, Redirect, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType} from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';


@Crud({
    model: Article
})

@UseGuards(AuthGuard('jwt'))
@Controller('articles')
@ApiTags('文章')
export class ArticlesController {
    constructor(
        @InjectModel(Article) private readonly model: ReturnModelType<typeof Article>,
        @InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>,
    ) { }

    @Get('option')
     async option() {
        const category = (await this.categoryModel.find()).map(v =>({
            label:v.name,
            value:v._id
        }))
        return {
            index: true,
            indexLabel: '序号',
            title: "文章管理",
            align: 'center',
            translate:false,
            column: [
                { prop: "title", label: "文章名称", sortable: true, search: true, regex: true, span: 12, searchTip: '名称', overHidden: true },
                { prop: "category", label: "所属分类", span: 12, type:'select',row:true,dicData:category},
                { prop: "image", label: "封面图", type: 'upload', action: 'upload', listType: "picture-img", span: 12 },
                { prop: "image", label: '封面图路径', span: 12, hide: true },
                {
                    prop: "author", label: '作者', span: 8
                },
                { prop: 'publishtime', label: '发布时间', span: 8, formslot: true, type: "date", format: "yyyy-MM-dd" },
                {
                    prop: 'release', label: '状态', span: 8, type: 'select', dicData: [
                        {
                            label: '上线',
                            value: '1'
                        },
                        {
                            label: '下线',
                            value: '0'
                        }
                    ]
                },
                { prop: "body", label: "内容", row: true, span: 24, formslot: true, hide: true, action: 'upload' },
            ],
        }
    }

}

