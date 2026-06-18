import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { CreateTaskDialogComponent } from "../dialogs/task/create-task-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
    constructor(public dialog: MatDialog) { }
    
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
}