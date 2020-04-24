import { Repository, EntityRepository } from "typeorm";
import { File } from "./file.entity";

@EntityRepository(File)
export class FileRepository extends Repository<File>{

}