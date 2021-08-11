import { Strategy, IStrategyOptions } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose'
import { Admin } from '@libs/db/models/admin.model'
import { ReturnModelType } from '@typegoose/typegoose'
import { BadRequestException } from '@nestjs/common'
import { compareSync } from 'bcryptjs'

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        } as IStrategyOptions)
    }

    async validate(username: string, password: string) {
        const user = await this.adminModel.findOne({ username }).select('+password');
        if (!user) {
            throw new BadRequestException('用户名不正确');
        }
        if (!compareSync(password, user.password)) {
            throw new BadRequestException('密码不正确')
        }
        return user;
    }
}