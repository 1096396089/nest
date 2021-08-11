import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config'
import { DbModule } from '@libs/db';
import { JwtModule } from '@nestjs/jwt'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.registerAsync({
      useFactory(){
        return{
          secret:'sdfkl1j3ioisdjiolkgj210iasdat2'
        }
      }
    }),
    DbModule,
  ],
  providers: [CommonService],
  exports: [CommonService,JwtModule],
})
export class CommonModule { }
