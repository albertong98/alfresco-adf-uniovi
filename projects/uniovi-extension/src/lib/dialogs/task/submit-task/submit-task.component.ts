import { Component, Inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { StudentTask } from '../../../models/student-task';
import { CreateFile } from '../../../models/file';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateRecordDialogComponent } from '../../record/create-record-dialog.component';

@Component({
  selector: 'app-submit-task',
  templateUrl: './submit-task.component.html',
  styleUrls: ['./submit-task.component.scss']
})
export class SubmitTaskComponent {
  selectedFiles: File[] = [];
  constructor( 
      @Inject(MAT_DIALOG_DATA)
      public data: { nodeId: string },
      public taskService:TaskService,
      private dialogRef: MatDialogRef<CreateRecordDialogComponent>
    ) { }

  onFilesChanged(files: File[]): void {
    this.selectedFiles = files;
  }
  
  onSubmit(){
    let task: StudentTask = new StudentTask();
    task.submissionData = this.selectedFiles.map(file => new CreateFile(crypto.randomUUID(),file));
    this.taskService.submitTask(task,this.data.nodeId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
