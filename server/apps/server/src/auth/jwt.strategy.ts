import { Strategy, StrategyOptions,ExtractJwt} from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { User } from '@libs/db/models/user.model'


export class JwtStrategy extends PassportStrategy(Strategy, ) {
    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ) {
        super({
           jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
           secretOrKey:'sdfkl1j3ioisdjiolkgj210iasdat2'
        } as StrategyOptions)
    }

    async validate(id) {
      return await this.userModel.findById(id)
    }
}