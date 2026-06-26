import { CreateFile } from "./file";

export class StudentTask{
    submissionData: CreateFile[] = [];
}

export const statusMap = new Map<string, string>();
statusMap.set("01","Pendiente");
statusMap.set("02","Entregado");
statusMap.set("03","Suspenso");
statusMap.set("04","Aprobado");
statusMap.set("05","No entregado");