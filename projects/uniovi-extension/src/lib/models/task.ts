import { CreateFile } from "./file";

export class Task{
    subjectUUID: string= '';
    title: string = '';
    description:string = '';
    dueDate: Date = new Date();
    fileData: CreateFile[] = [];
    subjectName: string = '';
}

export const GROUP_TASK_SITE: string = "GROUP_site_tasks";
export const GROUP_TASK_SITE_MANAGER: string = "GROUP_site_tasks_SiteManager";
export const GROUP_TASK_SITE_COLLABORATOR: string = 'GROUP_site_tasks_SiteCollaborator';
export const GROUP_TASK_SITE_CONSUMER: string = "GROUP_site_tasks_SiteConsumer";
export const TYPE_TASK: string = "uo:task";
export const TYPE_STUDENT_TASK: string = "uo:studentTask";
export const TYPE_SUBJECT: string = "uo:subject";