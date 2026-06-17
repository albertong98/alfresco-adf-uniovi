import { MatDialog } from "@angular/material/dialog";
import { Injectable } from "@angular/core";
import { CreateSubjectDialogComponent } from "../dialogs/subject/create-subject-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
    constructor(public dialog: MatDialog) { }
    
    openSubjectDialogComponent() {
        return this.dialog.open(CreateSubjectDialogComponent,
            {
                disableClose: true,
                autoFocus: true,
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
                autoFocus: true,
                width: '40%',
                maxHeight: '90%', 
                data:  { }
            },
        );
    }
}