import { Injectable } from "@angular/core";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, take } from "rxjs/operators";
import { CreateTaskAction, TaskActionTypes, SubmitTaskAction, ViewTaskDocuments, ViewParentTaskDocuments } from "../actions/task-actions";
import { TaskService } from "../../services/task.service";
import { AppStore, getAppSelection } from "@alfresco/aca-shared/store";
import { Store } from "@ngrx/store";

@Injectable()
export class TaskEffects {
  navigation: Navigation | null = null;

  constructor(
  
    private actions$: Actions,
    private router: Router,
    private taskService:TaskService,
    private store: Store<AppStore>
  ) { 
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)
    ).subscribe((_event: NavigationEnd) => {
      this.navigation = this.router.getCurrentNavigation();
    });
  }

  createTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<CreateTaskAction>(TaskActionTypes.CreateTask),
        map((_action) => {
          this.taskService.openCreateTaskDialogComponent();
        })
      ),
    { dispatch: false }
  );

  submitTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<SubmitTaskAction>(TaskActionTypes.SubmitTask),
        map(() => {
          this.openSubmitTaskDialogComponent();
        })
      ),
    { dispatch: false }
  );

  viewDocumentList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ViewTaskDocuments>(TaskActionTypes.ViewTaskDocuments),
        map(() => {
          this.openTaskDocumentListDialogComponent();
        })
      ),
    { dispatch: false }
  );

  viewParentDocumentList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ViewParentTaskDocuments>(TaskActionTypes.ViewParentTaskDocuments),
        map(() => {
          this.openParentTaskDocumentListDialogComponent();
        })
      ),
    { dispatch: false }
  );

  private openSubmitTaskDialogComponent() {
    this.store
        .select(getAppSelection)
        .pipe(take(1))
        .subscribe((selection) => {
          if (selection && selection.count == 1) {
            const UUID = selection.nodes[0].entry.id;
            this.taskService.openSubmitTaskDialogComponent(UUID);
          }
        });
  }

  private openTaskDocumentListDialogComponent() {
    this.store
        .select(getAppSelection)
        .pipe(take(1))
        .subscribe((selection) => {
          if (selection && selection.count == 1) {
            const UUID = selection.nodes[0].entry.id;
            this.taskService.openDocumentDialog(UUID);
          }
        });
  }

  private openParentTaskDocumentListDialogComponent() {
    this.store
        .select(getAppSelection)
        .pipe(take(1))
        .subscribe((selection) => {
          if (selection && selection.count == 1) {
            const UUID: string = selection.nodes[0].entry.properties['uo:parentTaskUUID'];
            this.taskService.openDocumentDialog(UUID);
          }
        });
  }
}
