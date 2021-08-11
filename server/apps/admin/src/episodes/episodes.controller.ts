import { Episode } from '@libs/db/models/episode.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Crud({
    model:Episode
})
@Controller('episodes')
@UseGuards(AuthGuard('jwt'))
@ApiTags('课时')
export class EpisodesController {
  constructor(
      @InjectModel(Episode) private readonly model :ReturnModelType<typeof Episode>,
  ){ }


  @Get('option')

  async option() {
    //   const courses = (await this.courseModel.find()).map(v => ({
    //       label:v.name,
    //       value:v._id
    //   }))
      return {
          title: "课时管理",
          translate:false,
          align:'center',
          column: [
              // { prop: "course", label: "所属课程",type:'select',row:true,dicData:courses},
              { prop: "name", label: "课时名称" ,span:24},
              { prop: "file", label: "视频文件" ,span:24,type:'upload',action:'/upload',listType:"picture-img"},
          ],
      }
}
}
