import { AlfrescoApiService } from '@alfresco/adf-core';
import {Component,Inject,OnInit} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateTask } from '../../models/task';

@Component({
    selector: 'app-create-task-dialog',
    templateUrl: './create-task-dialog.component.html',
    styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

    taskForm!: FormGroup;

    constructor(
        private alfrescoApiService: AlfrescoApiService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.taskForm = this.fb.group({
            name: ['',Validators.required],
            schoolYear: ['',Validators.required,Validators.pattern(/[0-9]{4}\-[0-9]{4}/)],
            professors: [this.fb.array([])],
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.taskForm.invalid) {
            this.taskForm.markAllAsTouched();
            return;
        }

        const task: CreateTask = this.getTaskValues();
        
        const formParam: any = {
            data: JSON.stringify(task)
        };

        const path = 'uniovi/task';
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
                url
        ).then(res => console.log(res));
        this.dialogRef.close();
    }

    private getTaskValues(): CreateTask{
        let task: CreateTask = new CreateTask();
        task.data.subjectUUID = this.taskForm.get('subjectUUID')?.value;
        task.data.title = this.taskForm.get('title')?.value;
        task.data.description = this.taskForm.get('description')?.value;
        task.data.dueDate = this.taskForm.get('dueDate')?.value;

        return task;
    }
}