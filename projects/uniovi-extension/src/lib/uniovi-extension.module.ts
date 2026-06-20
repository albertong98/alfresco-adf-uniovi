import { NgModule } from '@angular/core';
import { UnioviExtensionComponent } from './uniovi-extension.component';
import { ExtensionService, provideExtensionConfig } from '@alfresco/adf-extensions';
import { CoreModule, DataTableModule, MaterialModule, TranslationService } from '@alfresco/adf-core';
import { CustomListComponent } from './components/custom-list/custom-list.component';

import * as rules from './rules/uniovi.rules';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RecordEffects } from './store/effects/record.effects';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { CreateRecordDialogComponent } from './dialogs/record/create-record-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from 'app/src/app/components/common/common.module';
import { SharedModule, SharedToolbarModule, SharedInfoDrawerModule, PageLayoutModule, SharedDirectivesModule } from '@alfresco/aca-shared';
import { ContentModule } from '@alfresco/adf-content-services';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecordService } from './services/record.service';
import { CreateStudentDialogComponent } from './dialogs/student/create-student-dialog.component';
import { StudentService } from './services/student.service';
import { SubjectService } from './services/subject.service';
import { CreateSubjectDialogComponent } from './dialogs/subject/create-subject-dialog.component';
import { ApiService } from './services/api.service';
import { TaskService } from './services/task.service';
import { CreateTaskDialogComponent } from './dialogs/task/create-task-dialog.component';
import { StudentEffects } from './store/effects/student.effects';
import { SubjectEffects } from './store/effects/subject.effects';
import { TaskEffects } from './store/effects/task.effects';
import { RouterModule } from '@angular/router';
import { routes } from '../uniovi.routes';
import { TaskListComponent } from './components/custom-list/task-list/task-list.component';
import { RecordListComponent } from './components/custom-list/record-list/record-list.component';
import { StudentListComponent } from './components/custom-list/student-list/student-list.component';
import { StudentTaskListComponent } from './components/custom-list/student-task-list/student-task-list.component';

@NgModule({
  declarations: [
    UnioviExtensionComponent,
    CustomListComponent,
    CreateRecordDialogComponent,
    CreateStudentDialogComponent,
    CreateSubjectDialogComponent,
    CreateTaskDialogComponent,
    TaskListComponent,
    RecordListComponent,
    StudentListComponent,
    StudentTaskListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    EffectsModule.forFeature([RecordEffects,StudentEffects,SubjectEffects,TaskEffects]),
    DataTableModule,
    CommonModule,
    MaterialModule,
    MatChipsModule, 
    DragDropModule, 
    MatFormFieldModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatMenuModule, 
    MatButtonModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule.forChild(),
    AppCommonModule,
    ContentModule.forChild(),
    SharedModule,
    SharedToolbarModule,
    SharedInfoDrawerModule,
    PageLayoutModule,
    SharedDirectivesModule,
    FlexLayoutModule,
  ],
  exports: [
    UnioviExtensionComponent,
    CustomListComponent
  ],
  providers:[
    provideExtensionConfig(['uniovi.extension.json']),
    ApiService,
    RecordService,
    StudentService,
    SubjectService,
    TaskService
  ]
})
export class UnioviExtensionModule {
  constructor(private extensions: ExtensionService,private translation:TranslationService){
    this.translation.addTranslationFolder('uniovi-extension','assets/uniovi-extension');
     this.extensions.setEvaluators({
      'uniovi.canCreateRecord': rules.canCreateRecord,
      'uniovi.canViewRecords': rules.canCreateRecord,
      'uniovi.canCreateStudent': rules.canCreateStudent,
      'uniovi.canViewStudents': rules.canCreateStudent,
      'uniovi.canCreateSubject': rules.canCreateSubject,
      'uniovi.canCreateTask':rules.canCreateTask,
      'uniovi.canViewTasks':rules.canViewTasks
     });
  }
}
