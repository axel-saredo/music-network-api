import { extname } from 'path';
import { File } from '../../file/file.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileMapper {
  fromMulterToModel(file: any): Partial<File> {
    return {
      fileName: file.filename,
      originalName: file.originalname,
      extension: extname(file.originalname),
      contentType: file.mimetype,
      path: file.path,
    };
  }
}
