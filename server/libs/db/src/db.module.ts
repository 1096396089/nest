import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './models/user.model';
import { Episode } from './models/episode.model';
import { Admin } from './models/admin.model';
import { Article } from './models/article.model';
import { Resource } from './models/resource.model';
import { Media } from './models/media.model';
import { Carousel } from './models/carousel.model';
import { Category } from './models/category.model';


const models = TypegooseModule.forFeature([
  User,
  Episode,
  Admin,
  Article,
  Resource,
  Media,
  Carousel,
  Category
])


@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri:'mongodb://localhost/topfullstack',
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: true
        }
      }
    }),
    // TypegooseModule.forRoot(process.env.DB,{
    //   useNewUrlParser:true,
    //   useUnifiedTopology:true,
    //   useCreateIndex:true,
    //   useFindAndModify:true
    // }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule { }
