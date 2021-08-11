import { Admin, AdminDocument } from '@libs/db/models/admin.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport'
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt'
import { User } from '@libs/db/models/user.model';

@Controller('auth')
@ApiTags('用户')
export class AuthController {

    constructor(
        private jwtService: JwtService,
        @InjectModel(User) private UsdrModel: ReturnModelType<typeof User>
    ) { }

    @Post('register')
    @ApiOperation({ summary: '注册' })
    async register(@Body() dto: RegisterDto) {
        const { username, password } = dto
        const user = await this.UsdrModel.create({
            username,
            password
        })
        return user
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
    // async user(@CurrentUser() user:DocumentType<Admin>) {
    //     return user
    // }
    async user(@Req() req) {
        return req.user
    }

}
