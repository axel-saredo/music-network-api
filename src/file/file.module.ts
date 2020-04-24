import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository]),],
})
export class FileModule {}
