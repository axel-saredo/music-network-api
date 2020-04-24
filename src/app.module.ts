import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TracksModule } from './tracks/tracks.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TracksModule, AuthModule, FileModule],
})
export class AppModule {}
