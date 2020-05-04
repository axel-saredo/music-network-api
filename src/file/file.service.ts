import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { File } from './file.entity';
import { FileMapper } from '../utils/mappers/file.mapper';
import { UserRepository } from '../auth/user/user.repository';
import { TrackRepository } from '../tracks/track.repository';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileRepository)
        private fileRepository: FileRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(TrackRepository)
        private trackRepository: TrackRepository,
        private fileMapper: FileMapper,
    ) {}

    async saveProfilePicture(file, userId: string) {
        const fileData = this.fileMapper.fromMulterToModel(file);
        fileData.type = 'profile-picture';
        const fileModel = await this.createfile(fileData);
        await this.userRepository.update({ id: userId }, { profilePictureId: fileModel.id });
    }

    async createfile(fileData: Partial<File>) {
        return this.fileRepository.create(fileData).save();
    }

    async getProfilePictureByUserId(id: string) {
        const user = await this.userRepository.findOne(id, {relations: ['profilePicture']});
        let file: File;

        if (user) {
            file = user.profilePicture;
        }

        return file;
    }

    async saveTrackAudio(file, trackId: string) {
        const fileData = this.fileMapper.fromMulterToModel(file);
        fileData.type = 'track';
        const fileModel = await this.createfile(fileData);
        await this.trackRepository.update({ id: trackId }, { audioId: fileModel.id });
    }

    async getTrackAudioByTrackId(id: string) {
        const track = await this.trackRepository.findOne(id, {relations: ['audio']});
        let audio: File;
        
        if (track) {
            audio = track.audio
        } 
        
        return audio;
    }   

    async saveTrackPicture(file, trackId: string) {
        const fileData = this.fileMapper.fromMulterToModel(file);
        fileData.type = 'track-picture';
        const fileModel = await this.createfile(fileData);
        await this.trackRepository.update({ id: trackId }, { pictureId: fileModel.id });
    }

    async getTrackPictureByTrackId(trackId: string) {
        const track = await this.trackRepository.findOne(trackId, {relations: ['picture']});
        
        let file: File;

        if (track) {
            file = track.picture;
        }
        
        return file;
    }

    
    
    // TODO: Get default profile pic if file is undefined, for that, save the default profile pic in the db using migrations (same for tracks)

    // async getDefaultProfilePicture() {
    //     return this.fileRepository.findOne({ where: { fileName: 'default-profile-picture.png' }} );
    // }
}
