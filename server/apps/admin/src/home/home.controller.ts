import { Admin } from '@libs/db/models/admin.model';
import { Article } from '@libs/db/models/article.model';
import { Media } from '@libs/db/models/media.model';
import { Resource } from '@libs/db/models/resource.model';
import { User } from '@libs/db/models/user.model';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

@Controller('home')
@ApiTags('首页')
export class HomeController {
    constructor(
        @InjectModel(Article) private readonly article: ReturnModelType<typeof Article>,
        @InjectModel(Media) private readonly media: ReturnModelType<typeof Media>,
        @InjectModel(Resource) private readonly resource: ReturnModelType<typeof Resource>,
        @InjectModel(User) private readonly user: ReturnModelType<typeof User>,
        @InjectModel(Admin) private readonly admin: ReturnModelType<typeof Admin>
    ) { }

    @ApiOperation({ summary: '可视化数据' })
    @Get('option')
    async option() {
        const article = await this.article.count()
        const media = await this.media.count()
        const resource = await this.resource.count()
        const user = await this.user.count()
        const admin = await this.admin.count()
        return {
            data: [
                { title: "管理员", subtitle: "实时", count: admin, color: "rgb(147, 211, 142)", key: "类",},
                { title: "文章", subtitle: "实时", count: article, color: "rgb(27, 201, 142)", key: "类", },
                { title: "视频资源", subtitle: "实时", count: media, color: "rgb(230, 71, 88)", key: "类", },
                { title: "图片资源", subtitle: "实时", count: resource, color: "rgb(178, 159, 255)", key: "类", },
                { title: "用户", subtitle: "实时", count: user, color: "rgb(227, 201, 142)", key: "类", },
            ]
        }
    }
}
