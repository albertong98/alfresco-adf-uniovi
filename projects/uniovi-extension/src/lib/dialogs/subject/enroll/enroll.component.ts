import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { ResultNode } from '@alfresco/js-api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enrollment } from '../../../models/enrollment';
import { AuthenticationService } from '@alfresco/adf-core';
import { TYPE_SUBJECT } from '../../../models/task';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.scss']
})
export class EnrollComponent implements OnInit {

  nodes: ResultNode[] | undefined = [];
  selectedNodes: any[] = [];
  enrollForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EnrollComponent>,
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const username = this.authService.getEcmUsername();
    this.enrollForm = this.fb.group({studentUo: [username, [Validators.required, Validators.pattern(/^UO[0-9]{6}/)]]});
    this.apiService
      .getNodesByType(TYPE_SUBJECT)
      .subscribe(result => this.nodes = result.list?.entries?.map(e => e.entry));
  }

  toggleSelection(node: any): void {
    const index = this.selectedNodes.findIndex(n => n.id === node.id);

    if (index >= 0)
      this.selectedNodes.splice(index, 1);
    else
      this.selectedNodes.push(node);
  }

  onSubmit(): void {
    if (this.enrollForm.invalid) {
        this.enrollForm.markAllAsTouched();
        return;
    }
    const enroll:Enrollment = this.getEnrollValues();
    const formParam: any = {
        data: JSON.stringify(enroll)
    };
    this.apiService.updateItem(formParam,'uniovi/enroll');
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  isSelected(node: any): boolean {
    return this.selectedNodes.some(n => n.id === node.id);
  }

  private getEnrollValues(): Enrollment{
      let enroll: Enrollment = new Enrollment();
      enroll.studentUo = this.enrollForm.get('studentUo')?.value;
      enroll.subjectUUIDs = this.selectedNodes.map(e => e.id);
      return enroll;
  }

}
