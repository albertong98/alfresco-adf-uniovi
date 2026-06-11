import { CreateFile } from "./file";
import { Status } from "./status";
import { Student } from "./student";

export class CreateRecord {
    data: Record = new Record();
    files: CreateFile[] = [];
}

export class Record{
    uuid: string = '';
    recordNumber: string= '';
    student: Student= new Student();
    recordTitle: string= '';
    openingDate: Date= new Date();
    center: string= '';
    responsible: string= '';
    status: Status= new Status('');
}