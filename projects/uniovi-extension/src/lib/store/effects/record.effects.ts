import { Injectable } from "@angular/core";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map } from "rxjs/operators";
import { CreateRecordAction, RecordActionTypes} from "../actions/record-actions";
import { RecordService } from "../../services/record.service";

@Injectable()
export class RecordEffects {
  navigation: Navigation | null = null;

  constructor(
  
    private actions$: Actions,
    private router: Router,
    private recordService:RecordService
  ) { 
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)
    ).subscribe((_event: NavigationEnd) => {
      this.navigation = this.router.getCurrentNavigation();
    });
  }


  createRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<CreateRecordAction>(RecordActionTypes.CreateRecord),
        map((_action) => {
          this.recordService.openCreateRecordDialogComponent();
        })
      ),
    { dispatch: false }
  );
}
