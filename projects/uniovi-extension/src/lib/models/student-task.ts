import { CreateFile } from "./file";

export class StudentTask{
    uuid: string = "";
    submissionData: CreateFile[] = [];
}

export const STATUS_MAP = new Map<string, string>();
STATUS_MAP.set("Pendiente","01");
STATUS_MAP.set("Entregado","02");
STATUS_MAP.set("Suspenso","03");
STATUS_MAP.set("Aprobado","04");
STATUS_MAP.set("No entregado","05");