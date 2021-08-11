import { User } from '@libs/db/models/user.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Crud } from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Crud({
    model: User
})
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiTags('用户')
export class UsersController {
    constructor(@InjectModel(User) private readonly model) { }

    @Get('option')
    option() {
        return {
            index: true,
            indexLabel: '序号',
            title: "用户管理",
            column: [
                { prop: "username", label: "名称" ,sortable:true,search:true,regex:true},
                { prop: "password", label: "密码", sortable: true, row: true, span: 24, hide: true },
            ],
        }
}
}
