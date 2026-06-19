import { CreateFile } from "./file";
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
    status: string = '';
    type:string = '';
}

export const GROUP_RECORD_SITE: string = "GROUP_site_records";
export const GROUP_RECORD_SITE_MANAGER: string = "GROUP_site_records_SiteManager";
export const GROUP_RECORD_SITE_COLLABORATOR: string = "GROUP_site_records_SiteCollaborator";

