import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { CreateStudentDialogComponent } from "../dialogs/student/create-student-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    constructor(public dialog: MatDialog) { }
    
    openStudentDialogComponent() {
        return this.dialog.open(CreateStudentDialogComponent,
            {
                disableClose: true,
                autoFocus: true,
                width: '40%',
                maxHeight: '90%', 
                data:  { }
            },
        );
    }
    
    openCreateStudentDialogComponent() {
        return this.dialog.open(CreateStudentDialogComponent,
            {
                disableClose: true,
                autoFocus: true,
                width: '40%',
                maxHeight: '90%', 
                data:  { }
            },
        );
    }
}