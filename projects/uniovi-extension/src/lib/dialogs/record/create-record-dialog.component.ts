import { AlfrescoApiService } from '@alfresco/adf-core';
import {Component,Inject,OnInit} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateRecord } from '../../models/record';
import { Status } from '../../models/status';

@Component({
    selector: 'app-create-record-dialog',
    templateUrl: './create-record-dialog.component.html',
    styleUrls: ['./create-record-dialog.component.scss']
})
export class CreateRecordDialogComponent implements OnInit {

    recordForm!: FormGroup;

    constructor(
        private alfrescoApiService: AlfrescoApiService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateRecordDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.recordForm = this.fb.group({
            recordNumber: ['',Validators.required],
            recordTitle: ['',Validators.required],
            studentUO: ['', Validators.required],
            openingDate: ['',Validators.required],
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

        record.files?.forEach((file) => { 
            const fileId = file.id;
            formParam[fileId] = file.file;
        });

        const path = 'uniovi/record';
        const httpMethod = 'POST';
        const pathParams = {};
        const queryParams = {};
        const headerParams = {};
        const formParams = formParam;
        const bodyParam = {};
        const contentTypes = ['multipart/form-data'];
        const accepts = ['text/plain'];
        const returnType = '';
        const url = 'alfresco/service';

        this.alfrescoApiService
            .getInstance()
            .contentClient.callApi(
            path,
            httpMethod,
            pathParams,
            queryParams,
            headerParams,
            formParams,
            bodyParam,
            contentTypes,
            accepts,
            returnType,
            url);
        this.dialogRef.close();
    }

    private getRecordValues(): CreateRecord{
        let record: CreateRecord = new CreateRecord();
        record.data.center = this.recordForm.get('center')?.value;
        record.data.recordNumber = this.recordForm.get('recordNumber')?.value;
        record.data.recordTitle = this.recordForm.get('recordTitle')?.value;
        record.data.responsible = this.recordForm.get('responsible')?.value;
        record.data.student.uo = this.recordForm.get('studentUO')?.value;

        record.data.status = new Status('01');

        return record;
    }
}