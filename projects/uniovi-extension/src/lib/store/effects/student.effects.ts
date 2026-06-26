import { Injectable } from "@angular/core";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { StudentService } from "../../services/student.service";
import { CreateStudentAction, StudentActionTypes} from "../actions/student-actions";

@Injectable()
export class StudentEffects {
  navigation: Navigation | null = null;

  constructor(
  
    private actions$: Actions,
    private router: Router,
    private studentService:StudentService
  ) { 
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
}
