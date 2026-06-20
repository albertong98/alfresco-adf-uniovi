import { Routes } from "@angular/router";
import { AppLayoutComponent } from "app/src/app/components/layout/app-layout/app-layout.component";
import { StudentListComponent } from "./lib/components/custom-list/student-list/student-list.component";
import { GROUP_STUDENT_SITE } from "./lib/models/student";
import { UnioviGuard } from "./lib/guards/uniovi.guard";
import { TaskListComponent } from "./lib/components/custom-list/task-list/task-list.component";
import { RecordListComponent } from "./lib/components/custom-list/record-list/record-list.component";
import { GROUP_TASK_SITE } from "./lib/models/task";
import { GROUP_RECORD_SITE } from "./lib/models/record";
import { StudentTaskListComponent } from "./lib/components/custom-list/student-task-list/student-task-list.component";

export const routes: Routes = [
  {
    path: "list",
    component: AppLayoutComponent,
    children: [
      {
        path: "students",
        component: StudentListComponent,
        canActivate: [UnioviGuard],
        data: {
          title: "UNIOVI.STUDENTS.TITLE",
          groupId: GROUP_STUDENT_SITE
        }
      },
      {
        path: "tasks",
        component: TaskListComponent,
        canActivate: [UnioviGuard],
        data: {
          title: "UNIOVI.STUDENTS.TITLE",
          groupId: GROUP_TASK_SITE
        }
      },
      {
        path: "records",
        component: RecordListComponent,
        canActivate: [UnioviGuard],
        data: {
          title: "UNIOVI.STUDENTS.TITLE",
          groupId: GROUP_RECORD_SITE
        }
      },
      {
        path: "student-tasks",
        component: StudentTaskListComponent,
        canActivate: [UnioviGuard],
        data: {
          title: "UNIOVI.STUDENT_TASKS.TITLE",
          groupId: GROUP_TASK_SITE
        }
      },
    ]
  }
];