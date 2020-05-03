import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, OneToOne, JoinColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Track } from "../../tracks/track.entity";
import { File } from '../../file/file.entity';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    typeOfUser: string;

    @Column({default: null, nullable: true })
    description?: string;

    @Column({ nullable: true })
    profilePictureId: string;

    @Column('text', { nullable: true })
    @OneToOne(type => File, { eager: true })
    @JoinColumn({ name: 'profilePictureId' })
    profilePicture: File;

    @OneToMany(type => Track, track => track.author, { eager: true })
    tracks: Track[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}