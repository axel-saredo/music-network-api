import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, JoinColumn, OneToOne } from "typeorm";
import { User } from "../auth/user/user.entity";
import { File } from '../file/file.entity'

@Entity()
export class Track extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: number;

    @Column()
    title: string;

    @Column()
    plays: number;

    @Column('text', { nullable: true })
    @OneToOne(type => File)
    @JoinColumn({name: 'track_picture_id'})
    picture: File;

    @Column('text', { nullable: true })
    @OneToOne(type => File)
    @JoinColumn({name: 'audio_id'})
    audio: File;

    @Column('text', {nullable:true})
    @ManyToOne(type => User, user => user.tracks, { eager: false })
    @JoinColumn({ name: 'user_id' })
    author: User
}