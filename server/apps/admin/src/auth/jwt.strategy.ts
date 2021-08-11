import { Strategy, StrategyOptions,ExtractJwt} from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose'
import { Admin } from '@libs/db/models/admin.model'
import { ReturnModelType } from '@typegoose/typegoose'


export class JwtStrategy extends PassportStrategy(Strategy, ) {
    constructor(
        @InjectModel(Admin) private adminModel: ReturnModelType<typeof Admin>
    ) {
        super({
           jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
           secretOrKey:'sdfkl1j3ioisdjiolkgj210iasdat2',
        } as StrategyOptions)
    }

    async validate(id) {
      return await this.adminModel.findById(id)
    }
}