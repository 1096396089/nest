import { Admin, AdminDocument } from '@libs/db/models/admin.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
@ApiTags('管理员')
export class AuthController {

    constructor(
        private jwtService: JwtService,
        @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>
    ) { }

    @Post('register')
    @ApiOperation({ summary: '注册' })
    async register(@Body() dto: RegisterDto) {
        const { username, password } = dto
        const admin = await this.adminModel.create({
            username,
            password
        })
        return admin
    }


    @Post('login')
    @ApiOperation({ summary: '登录' })
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @Req() req) {
        return {
            token: this.jwtService.sign(String(req.user._id))
        }
    }

    @Get('user')
    @ApiOperation({ summary: '获取个人信息' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async user(@Req() req) {
        return req.user
    }

}
