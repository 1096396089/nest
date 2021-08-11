import { Admin } from '@libs/db/models/admin.model';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';


@Crud({
    model: Admin
})
@ApiTags('管理员CRUD')
@UseGuards(AuthGuard('jwt'))
@Controller('adminuser')
export class AdminuserController {
    constructor(
        @InjectModel(Admin) private readonly model: ReturnModelType<typeof Admin>
    ) { }

    @Get('option')
    option() {
        return {
            title: "管理员",
            index: true,
            indexLabel: '序号',
            align: 'center',
            column: [
                { prop: "username", label: "用户名", sortable: true, search: true, regex: true, row: true, span: 24, },
                { prop: "password", label: "密码", sortable: true, row: true, span: 24, hide: true },
            ],
        }
    }
}
