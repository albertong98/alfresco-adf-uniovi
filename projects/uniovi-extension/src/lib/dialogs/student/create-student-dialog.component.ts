import {Component,Inject,OnInit} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Student } from '../../models/student';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-create-student-dialog',
    templateUrl: './create-student-dialog.component.html',
    styleUrls: ['./create-student-dialog.component.scss']
})
export class CreateStudentDialogComponent implements OnInit {

    studentForm!: FormGroup;

    constructor(
        private apiService: ApiService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CreateStudentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit(): void {
        this.studentForm = this.fb.group({
            name: ['',Validators.required],
            surname: ['',Validators.required],
            id: ['', [Validators.required,Validators.pattern(/^[0-9]{8}[A-Z]$/)]],
            uo: ['',[Validators.required, Validators.pattern(/^UO[0-9]{6}/)]]
        });
        Object.values(this.studentForm.controls).forEach(control => {
            control.markAsUntouched();
        });
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        if (this.studentForm.invalid) {
            this.studentForm.markAllAsTouched();
            return;
        }

        const student: Student = this.getStudentValues();
        
        const formParam: any = {
            data: JSON.stringify(student)
        };

        this.apiService.createNewItem(formParam,'uniovi/student');

        this.dialogRef.close();
    }

    private getStudentValues(): Student{
        let student: Student = new Student();
        student.name = this.studentForm.get('name')?.value;
        student.surname = this.studentForm.get('surname')?.value;
        student.id = this.studentForm.get('id')?.value;
        student.uo = this.studentForm.get('uo')?.value;

        return student;
    }
}