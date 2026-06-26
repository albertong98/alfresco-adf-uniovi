import {Component,Inject,OnInit} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateTask, TYPE_SUBJECT } from '../../models/task';
import { ApiService } from '../../services/api.service';
import { KeyValue } from '@angular/common';
import { CreateFile } from '../../models/file';

@Component({
    selector: 'app-create-task-dialog',
    templateUrl: './create-task-dialog.component.html',
    styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialogComponent implements OnInit {

    taskForm!: FormGroup;
    subjects!: KeyValue<string,string>[];
    selectedSubject!: string;
    selectedFiles: File[] = [];

    constructor(
        private apiService: ApiService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.loadSubjects();
        this.taskForm = this.fb.group({
            title: ['',Validators.required],
            description: ['',Validators.required],
            dueDate: [null,Validators.required]
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
            data: JSON.stringify(task.data)
        };

        this.apiService.createNewItem(formParam,"uniovi/task");
        
        this.dialogRef.close();
    }

    private getTaskValues(): CreateTask{
        let task: CreateTask = new CreateTask();
        task.data.subjectUUID = this.selectedSubject;
        task.data.title = this.taskForm.get('title')?.value;
        task.data.description = this.taskForm.get('description')?.value;
        task.data.dueDate = this.taskForm.get('dueDate')?.value;
        task.fileData = this.selectedFiles.map(file => new CreateFile(crypto.randomUUID(),file));
        
        return task;
    }

    private loadSubjects(){
        this.apiService.getNodesByType(TYPE_SUBJECT)
                .subscribe(result => 
                    this.subjects = result.list?.entries?.map(e => 
                        ({key: e.entry.id, value: `${e.entry.properties['uo:subjectName']} - ${e.entry.properties['uo:schoolYear']}` })
                    ) || []);
    }

    onSubjectChange(event: any){
        this.selectedSubject = event.value;
        console.log(this.selectedSubject);
    }

    onFilesChanged(files: File[]): void {
        this.selectedFiles = files;
    }
}