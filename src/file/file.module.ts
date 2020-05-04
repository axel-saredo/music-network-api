import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileMapper } from '../utils/mappers/file.mapper';
import { UserRepository } from '../auth/user/user.repository';
import { TrackRepository } from '../tracks/track.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileRepository]), TypeOrmModule.forFeature([UserRepository]), TypeOrmModule.forFeature([TrackRepository])],
  controllers: [
    FileController, ],
  providers: [
    FileService, FileMapper],
})
export class FileModule {}
