import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { CreateTaskDialogComponent } from "../dialogs/task/create-task-dialog.component";
import { ApiService } from "./api.service";
import { StudentTask } from "../models/student-task";
import { SubmitTaskComponent } from "../dialogs/task/submit-task/submit-task.component";
import { DocumentListDialogComponent } from "../dialogs/document-list-dialog/document-list-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    constructor(public dialog: MatDialog, public apiService: ApiService) { }
    
    openTaskDialogComponent() {
        return this.dialog.open(CreateTaskDialogComponent,
            {
                disableClose: true,
                autoFocus: false,
                width: '40%',
                maxHeight: '90%', 
                data:  { }
            },
        );
    }
    
    openCreateTaskDialogComponent() {
        return this.dialog.open(CreateTaskDialogComponent,
            {
                disableClose: true,
                autoFocus: false,
                width: '40%',
                maxHeight: '90%', 
                data:  { }
            },
        );
    }

    openSubmitTaskDialogComponent(nodeId:string) {
        return this.dialog.open(SubmitTaskComponent,
            {
                disableClose: true,
                autoFocus: false,
                width: '40%',
                maxHeight: '40%', 
                data:  { 
                    nodeId: nodeId
                }
            },
        );
    }

    submitTask(task:StudentTask,id:string){
        const formParam: any = {
            data: JSON.stringify(task)
        };

        task.submissionData?.forEach((file) => { 
            const fileId = file.id;
            formParam[fileId] = file.file;
        });
        
        this.apiService.updateItem(formParam,'uniovi/submit',id);
    }

    openDocumentDialog(nodeId:string){
        this.dialog.open(DocumentListDialogComponent, {
            width: '50%',
            maxHeight: '60%',
            data: {
                nodeId: nodeId
            }
        });
    }
}