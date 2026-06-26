import { CreateFile } from "./file";

export class CreateSubject{
    data: Subject = new Subject();
    fileData: CreateFile[] = [];
}

export class Subject{
    schoolYear: string = '';
    name: string = '';
    professors: string[] = [];
}

export const GROUP_SUBJECT_SITE_MANAGER: string = "GROUP_site_subjects_SiteManager";
export const GROUP_SUBJECT_SITE_COLLABORATOR: string = 'GROUP_site_subjects_SiteCollaborator';