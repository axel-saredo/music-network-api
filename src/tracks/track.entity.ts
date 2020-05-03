import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Generated, JoinColumn, OneToOne } from "typeorm";
import { User } from "../auth/user/user.entity";
import { File } from '../file/file.entity'

@Entity()
export class Track extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    plays: number;

    @Column({ nullable: true })
    pictureId: string;

    @Column('text', { nullable: true })
    @OneToOne(type => File, {cascade: true, onDelete: 'CASCADE', eager: true })
    @JoinColumn({name: 'pictureId'})
    picture: File;

    @Column({ nullable: true })
    audioId: string;

    @Column('text', { nullable: true })
    @OneToOne(type => File, {cascade: true, onDelete: 'CASCADE', eager: true } )
    @JoinColumn({ name: 'audioId' })
    audio: File;

    @Column({ nullable: true })
    authorId: string;

    @Column('text', {nullable:true})
    @ManyToOne(type => User, user => user.tracks, { eager: false })
    @JoinColumn({ name: "authorId" })
    author: User
}