import { Injectable } from "@angular/core";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { SubjectService } from "../../services/subject.service";
import { CreateSubjectAction, SubjectActionTypes,EnrollAction } from "../actions/subject-actions";

@Injectable()
export class SubjectEffects {
  navigation: Navigation | null = null;

  constructor(
  
    private actions$: Actions,
    private router: Router,
    private subjectService:SubjectService
  ) { 
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)
    ).subscribe((_event: NavigationEnd) => {
      this.navigation = this.router.getCurrentNavigation();
    });
  }

  createSubject$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<CreateSubjectAction>(SubjectActionTypes.CreateSubject),
        map((_action) => {
          this.subjectService.openCreateSubjectDialogComponent();
        })
      ),
    { dispatch: false }
  );


  enroll$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<EnrollAction>(SubjectActionTypes.Enroll),
        map(() => {
          this.openEnrollDialogComponent();
        })
      ),
    { dispatch: false }
  );

  private openEnrollDialogComponent(){
    this.subjectService.openEnrollmentDialogComponent();
  }
}
