import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { CreateSubjectDialogComponent } from "../dialogs/subject/create-subject-dialog.component";
import { EnrollComponent } from "../dialogs/subject/enroll/enroll.component";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
    constructor(public dialog: MatDialog) { }
    
    openSubjectDialogComponent() {
        return this.dialog.open(CreateSubjectDialogComponent,
            {
                disableClose: true,
                autoFocus: false,
                width: '40%',
                maxHeight: '90%', 
                data:  { }
            },
        );
    }
    
    openCreateSubjectDialogComponent() {
        return this.dialog.open(CreateSubjectDialogComponent,
            {
                disableClose: true,
                autoFocus: false,
                width: '40%',
                maxHeight: '90%', 
                data:  { }
            },
        );
    }

    openEnrollmentDialogComponent() {
        return this.dialog.open(EnrollComponent,
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