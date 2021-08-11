import { Module } from '@nestjs/common';
import { CommonModule } from 'libs/common/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MediaController } from './media/media.controller';
import { MediaModule } from './media/media.module';
import { ResourceController } from './resource/resource.controller';
import { ResourceModule } from './resource/resource.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesModule } from './articles/articles.module';
import { CarouselController } from './carousel/carousel.controller';
import { CarouselModule } from './carousel/carousel.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    MediaModule,
    ResourceModule,
    ArticlesModule,
    CarouselModule,
    CategoryModule
  ],
  controllers: [AppController, MediaController, ResourceController, ArticlesController, CarouselController, CategoryController],
  providers: [AppService],
})
export class AppModule {}
