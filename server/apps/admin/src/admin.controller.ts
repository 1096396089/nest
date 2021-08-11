import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';
import {  FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Get()
  // getHello(): string {
  //   return this.adminService.getHello();
    
  // }
  @ApiTags('文件上传')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file){
    return file
  }
}
