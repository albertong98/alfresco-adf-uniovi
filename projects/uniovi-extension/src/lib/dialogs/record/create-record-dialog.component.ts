import {Component,Inject,OnInit} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateRecord } from '../../models/record';
import { ApiService } from '../../services/api.service';
import { CreateFile } from '../../models/file';

@Component({
    selector: 'app-create-record-dialog',
    templateUrl: './create-record-dialog.component.html',
    styleUrls: ['./create-record-dialog.component.scss']
})
export class CreateRecordDialogComponent implements OnInit {

    recordForm!: FormGroup;
    selectedFiles: File[] = [];
    constructor(
        private apiService: ApiService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateRecordDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.recordForm = this.fb.group({
            recordNumber: ['',Validators.required],
            recordTitle: ['',Validators.required],
            studentUo: ['', [Validators.required, Validators.pattern(/^UO[0-9]{6}/)]],
            openingDate: ['',Validators.required],
            type: ['',Validators.required],
            center: ['',Validators.required],
            responsible: ['', Validators.required]
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.recordForm.invalid) {
            this.recordForm.markAllAsTouched();
            return;
        }

        const record: CreateRecord = this.getRecordValues();
        
        const formParam: any = {
            data: JSON.stringify(record.data)
        };

        record.fileData?.forEach((file) => { 
            const fileId = file.id;
            formParam[fileId] = file.file;
        });

        this.apiService.createNewItem(formParam,'uniovi/record');
        
        this.dialogRef.close();
    }

    private getRecordValues(): CreateRecord{
        let record: CreateRecord = new CreateRecord();
        record.data.center = this.recordForm.get('center')?.value;
        record.data.recordNumber = this.recordForm.get('recordNumber')?.value;
        record.data.recordTitle = this.recordForm.get('recordTitle')?.value;
        record.data.responsible = this.recordForm.get('responsible')?.value;
        record.data.student.uo = this.recordForm.get('studentUo')?.value;
        record.data.type = this.recordForm.get('type')?.value;
        record.fileData = this.selectedFiles.map(file => new CreateFile(crypto.randomUUID(),file));
        record.data.status = '01';

        return record;
    }


    onFilesChanged(files: File[]): void {
        this.selectedFiles = files;
    }
}