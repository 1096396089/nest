import { Media } from '@libs/db/models/media.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';


@Crud({
    model: Media
})
@ApiTags('视频文件')
@UseGuards(AuthGuard('jwt'))
@Controller('media')
export class MediaController {
    constructor(
        @InjectModel(Media) private readonly model: ReturnModelType<typeof Media>
    ) { }

    @Get('option')

    async option() {

        return {
            index: true,
            indexLabel: '序号',
            title: "视频管理",
            align: 'center',
            column: [
                { prop: "name", label: "视频名称", span: 24 },
                { prop: 'publishtime', label: '发布时间', row: true, formslot: true, },
                { prop: "file", label: "视频文件(双击打开)", span: 24,type: 'upload', action: '/upload', listType: "picture-img"},
            ],
        }
    }
}
