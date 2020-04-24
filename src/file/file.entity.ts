import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class File extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    filename: string;

    @Column()
    originalName: string;

    @Column()
    extension: string;

    @Column()
    path: string;

    @Column()
    type: string;

    @Column()
    contentType: string;
}