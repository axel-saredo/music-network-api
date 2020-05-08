import { Controller, UseInterceptors, UploadedFile, Get, Param, Put, Res, UseFilters, NotFoundException, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express';
import { HttpExceptionFilter } from '../utils/http-exception-filter';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/files')
export class FileController {
    constructor(private fileService: FileService) {}

    @UseGuards(AuthGuard('jwt'))
    @Put('/profile-picture/:id')
    @UseInterceptors(FileInterceptor('file', { dest: 'uploads/profile-pictures/' }))
    async createProfilePicture(@UploadedFile() file, @Param('id') userId: string) {
        await this.fileService.saveProfilePicture(file, userId);
    }

    @Get('/profile-picture/:id')
    @UseFilters(new HttpExceptionFilter())
    async retrieveProfilePicture(@Param() userId: string, @Res() res: Response) {
        try {
            const file = await this.fileService.getProfilePictureByUserId(userId);
            res.set('Content-Type', file.contentType);
            res.sendFile(join(file.path), { root: process.cwd() })
            
        } catch (error) {
            throw new NotFoundException('File was not found');
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/audio/:id')
    @UseInterceptors(FileInterceptor('file', { dest: 'uploads/tracks-audios/' }))
    async createTrackAudio(@UploadedFile() file, @Param('id') trackId: string) {
        await this.fileService.saveTrackAudio(file, trackId);
    }

    @Get('/audio/:id')
    @UseFilters(new HttpExceptionFilter())
    async retrieveTrackAudio(@Param() trackId: string, @Res() res: Response) {
        const file = await this.fileService.getTrackAudioByTrackId(trackId);

        if (!file) {
            throw new NotFoundException();
        }

        res.set('Content-Type', file.contentType);
        res.sendFile(join(file.path), { root: process.cwd() })
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/track-picture/:id')
    @UseInterceptors(FileInterceptor('file', { dest: 'uploads/tracks-pictures/' }))
    async createTrackPicture(@UploadedFile() file, @Param('id') trackId: string) {
        await this.fileService.saveTrackPicture(file, trackId);
    }

    @Get('/track-picture/:id')
    @UseFilters(new HttpExceptionFilter())
    async retrieveTrackPicture(@Param() trackId: string, @Res() res: Response) {
        const file = await this.fileService.getTrackPictureByTrackId(trackId);
        
        if (!file) {
            throw new NotFoundException('File was not found');
        }

        res.set('Content-Type', file.contentType);
        res.sendFile(join(file.path), { root: process.cwd() })
    }
}
