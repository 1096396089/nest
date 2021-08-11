import { DbModule } from '@libs/db';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
// import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from 'libs/common/src';
import { AuthModule } from './auth/auth.module';
import { AdminuserModule } from './adminuser/adminuser.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesModule } from './articles/articles.module';
import { ResourceController } from './resource/resource.controller';
import { ResourceModule } from './resource/resource.module';
import { MediaController } from './media/media.controller';
import { MediaModule } from './media/media.module';
import { HomeController } from './home/home.controller';
import { HomeModule } from './home/home.module';
import { CarouselController } from './carousel/carousel.controller';
import { CarouselModule } from './carousel/carousel.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';


const MAO = require('multer-aliyun-oss');

@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory(){
        return{
          //上线部署用env不生效，写死了
          storage: MAO({
            config: {
                region:'',
                accessKeyId:'',
                accessKeySecret:'',
                bucket: '',
            }
        })
        }
      }
    }),
    UsersModule,
    // EpisodesModule,
    AuthModule,
    AdminuserModule,
    ArticlesModule,
    ResourceModule,
    MediaModule,
    HomeModule,
    CarouselModule,
    CategoryModule,
  ],
  controllers: [AdminController, ArticlesController, ResourceController, MediaController, HomeController, CarouselController, CategoryController],
  providers: [AdminService],
})
export class AdminModule {}
