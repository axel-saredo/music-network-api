import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user/user.repository';
import { TrackRepository } from '../tracks/track.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), TypeOrmModule.forFeature([TrackRepository]),
],
    controllers: [
        UsersController, ],
    providers: [
        UsersService, ],
})
export class UsersModule {}
