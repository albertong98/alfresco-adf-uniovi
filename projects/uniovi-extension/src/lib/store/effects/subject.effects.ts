import { Injectable } from "@angular/core";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { SubjectService } from "../../services/subject.service";
import { CreateSubjectAction, SubjectActionTypes, ViewSubjectAction, EditSubjectAction } from "../actions/subject-actions";

@Injectable()
export class SubjectEffects {
  navigation: Navigation | null = null;

  constructor(
  
    private actions$: Actions,
    private router: Router,
    private subjectService:SubjectService
  ) { 
    // Escuchar cambios de navegación
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

  viewSubject$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ViewSubjectAction>(SubjectActionTypes.ViewSubject),
        map((action) => {
          this.openSubjectDialogComponent(action, SubjectActionTypes.ViewSubject);
        })
      ),
    { dispatch: false }
  );

  editSubject$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<EditSubjectAction>(SubjectActionTypes.EditSubject),
        map((action) => {
          this.openSubjectDialogComponent(action, SubjectActionTypes.EditSubject);
        })
      ),
    { dispatch: false }
  );

  private openSubjectDialogComponent(action: any, subjectActionType: SubjectActionTypes) {
    if (action && action.payload && action.payload.length > 0 && subjectActionType)
      this.subjectService.openSubjectDialogComponent();
    /*} else {
      this.store
        .select(getAppSelection)
        .pipe(take(1))
        .subscribe((selection) => {
          if (selection && selection.count > 0) {
            const UUIDs = selection.nodes.map((nodeEntry) => nodeEntry.entry.id);
            this.subjectService.openSubjectDialogComponent(UUIDs, subjectActionType);
          }
        });
    }*/
  }
}
