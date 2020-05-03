import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user/user.repository';
import { Track } from '../tracks/track.entity';
import { TrackRepository } from '../tracks/track.repository';
import { User } from '../auth/user/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(TrackRepository)
        private trackRepository: TrackRepository
    ) {}

    async getUserById(id: string) {
        const user = await this.userRepository
        .findOne({ where: { id: id } });
        
        if (!user) {
            throw new NotFoundException(`User was not found`);
        }

        return user;
    }

    async createTrack(authorId: string, trackData: Partial<Track>) {
        const user = await User.findOne({ id: authorId });
        if (user) {
            return this.trackRepository.create({title: trackData.title, authorId: user.id}).save();
        } else {
            throw new NotFoundException();
        }
    }

    async addProfileDescription(userId: string, description: string) {
        const user = await User.findOne({ id: userId });

        user.description = description;
        user.save();

        return user;
    }

    async getTracksByUserId(id: string) {
        const tracks = await this.trackRepository.find({ where: { authorId: id } });
        return tracks;
    }
}
