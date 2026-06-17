import { CreateFile } from "./file";

export class CreateTask{
    data: Task = new Task();
    files: CreateFile[] = [];
}

export class Task{
    subjectUUID: string= '';
    title: string = '';
    description:string = '';
    dueDate: Date = new Date();
}

export const GROUP_TASK_SITE_MANAGER: string = "GROUP_site_task_SiteManager";
export const GROUP_TASK_SITE_COLLABORATOR: string = 'GROUP_site_task_SiteCollaborator';