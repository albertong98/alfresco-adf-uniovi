import { Injectable } from "@angular/core";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { StudentService } from "../../services/student.service";
import { CreateStudentAction, StudentActionTypes, ViewStudentAction, EditStudentAction } from "../actions/student-actions";

@Injectable()
export class StudentEffects {
  navigation: Navigation | null = null;

  constructor(
  
    private actions$: Actions,
    private router: Router,
    private studentService:StudentService
  ) { 
    // Escuchar cambios de navegación
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)
    ).subscribe((_event: NavigationEnd) => {
      this.navigation = this.router.getCurrentNavigation();
    });
  }


  createStudent$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<CreateStudentAction>(StudentActionTypes.CreateStudent),
        map((_action) => {
          this.studentService.openCreateStudentDialogComponent();
        })
      ),
    { dispatch: false }
  );

  viewStudent$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ViewStudentAction>(StudentActionTypes.ViewStudent),
        map((action) => {
          this.openStudentDialogComponent(action, StudentActionTypes.ViewStudent);
        })
      ),
    { dispatch: false }
  );

  editStudent$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<EditStudentAction>(StudentActionTypes.EditStudent),
        map((action) => {
          this.openStudentDialogComponent(action, StudentActionTypes.EditStudent);
        })
      ),
    { dispatch: false }
  );

  private openStudentDialogComponent(action: any, studentActionType: StudentActionTypes) {
    if (action && action.payload && action.payload.length > 0 && studentActionType)
      this.studentService.openStudentDialogComponent();
    /*} else {
      this.store
        .select(getAppSelection)
        .pipe(take(1))
        .subscribe((selection) => {
          if (selection && selection.count > 0) {
            const UUIDs = selection.nodes.map((nodeEntry) => nodeEntry.entry.id);
            this.studentService.openStudentDialogComponent(UUIDs, studentActionType);
          }
        });
    }*/
  }
}
