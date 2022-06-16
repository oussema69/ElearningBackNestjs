import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { FilesService } from './files.service';
import { createReadStream } from 'fs';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('files')
export class FilesController {
  constructor(private fichierService: FilesService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFilea(@UploadedFile() file): any {
    console.log(file);
    return file;
  }

  @Get('/get/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<any> {
    return res.sendFile(join(process.cwd(), 'uploads/' + imagename));
  }

  @Get('as/:filename')
  getFile(@Param('filename') filename): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'uploads/' + filename));
    return new StreamableFile(file);
  }
}
