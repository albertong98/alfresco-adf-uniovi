import { MatDialog } from "@angular/material/dialog";
import { CreateRecordDialogComponent } from "../dialogs/record/create-record-dialog.component";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RecordService {
    constructor(public dialog: MatDialog) { }
    
    openRecordDialogComponent() {
        return this.dialog.open(CreateRecordDialogComponent,
            {
                disableClose: true,
                autoFocus: false,
                width: '40%',
                maxHeight: '90%', 
                data:  { }
            },
        );
    }
    
    openCreateRecordDialogComponent() {
        return this.dialog.open(CreateRecordDialogComponent,
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