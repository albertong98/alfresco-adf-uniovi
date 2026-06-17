import { Injectable } from "@angular/core";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { CreateTaskAction, TaskActionTypes, ViewTaskAction, EditTaskAction } from "../actions/task-actions";
import { TaskService } from "../../services/task.service";

@Injectable()
export class TaskEffects {
  navigation: Navigation | null = null;

  constructor(
  
    private actions$: Actions,
    private router: Router,
    private taskService:TaskService
  ) { 
    // Escuchar cambios de navegación
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

  viewTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ViewTaskAction>(TaskActionTypes.ViewTask),
        map((action) => {
          this.openTaskDialogComponent(action, TaskActionTypes.ViewTask);
        })
      ),
    { dispatch: false }
  );

  editTask$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<EditTaskAction>(TaskActionTypes.EditTask),
        map((action) => {
          this.openTaskDialogComponent(action, TaskActionTypes.EditTask);
        })
      ),
    { dispatch: false }
  );

  private openTaskDialogComponent(action: any, taskActionType: TaskActionTypes) {
    if (action && action.payload && action.payload.length > 0 && taskActionType)
      this.taskService.openTaskDialogComponent();
    /*} else {
      this.store
        .select(getAppSelection)
        .pipe(take(1))
        .subscribe((selection) => {
          if (selection && selection.count > 0) {
            const UUIDs = selection.nodes.map((nodeEntry) => nodeEntry.entry.id);
            this.taskService.openTaskDialogComponent(UUIDs, taskActionType);
          }
        });
    }*/
  }
}
