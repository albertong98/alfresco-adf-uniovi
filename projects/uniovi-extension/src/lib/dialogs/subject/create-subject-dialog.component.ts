import {Component,Inject,OnInit} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { CreateSubject } from '../../models/subject';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-create-subject-dialog',
    templateUrl: './create-subject-dialog.component.html',
    styleUrls: ['./create-subject-dialog.component.scss']
})
export class CreateSubjectDialogComponent implements OnInit {

    subjectForm!: FormGroup;

    constructor(
        private apiService: ApiService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateSubjectDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.subjectForm = this.fb.group({
            name: ['',Validators.required],
            schoolYear: ['',[Validators.required,Validators.pattern(/[0-9]{4}\-[0-9]{4}/)]],
            professors: [this.fb.array([])],
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.subjectForm.invalid) {
            this.subjectForm.markAllAsTouched();
            return;
        }

        const subject: CreateSubject = this.getSubjectValues();
                
        subject.fileData?.forEach((file) => { 
            const fileId = file.id;
            formParam[fileId] = file.file;
        });
        
        const formParam: any = {
            data: JSON.stringify(subject.data)
        };
        
        this.apiService.createNewItem(formParam,'uniovi/subject');
        
        this.dialogRef.close();
    }

    private getSubjectValues(): CreateSubject{
        let subject: CreateSubject = new CreateSubject();
        subject.data.name = this.subjectForm.get('name')?.value;
        subject.data.schoolYear = this.subjectForm.get('schoolYear')?.value;
        subject.data.professors = this.subjectForm.get('id')?.value as string[];

        return subject;
    }
}