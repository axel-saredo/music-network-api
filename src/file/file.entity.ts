import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class File extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fileName: string;

    @Column()
    originalName: string;

    @Column()
    extension: string;

    @Column()
    type: string;

    @Column()
    path: string;

    @Column()
    contentType: string;
}