import { AppStore, getAppSelection } from "@alfresco/aca-shared/store";
import { MinimalNodeEntity } from "@alfresco/js-api";
import { Injectable } from "@angular/core";
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { filter, map, take } from "rxjs/operators";
import { CreateRecordAction, RecordActionTypes, ViewRecordAction, EditRecordAction, DeleteRecordAction } from "../actions/record-actions";
import { RecordService } from "../../services/record.service";

@Injectable()
export class RecordEffects {
  navigation: Navigation | null = null;

  constructor(
    private store: Store<AppStore>,
    private actions$: Actions,
    private router: Router,
    private recordService:RecordService
  ) { 
    // Escuchar cambios de navegación
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

  viewRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ViewRecordAction>(RecordActionTypes.ViewRecord),
        map((action) => {
          this.openRecordDialogComponent(action, RecordActionTypes.ViewRecord);
        })
      ),
    { dispatch: false }
  );

  editRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<EditRecordAction>(RecordActionTypes.EditRecord),
        map((action) => {
          this.openRecordDialogComponent(action, RecordActionTypes.EditRecord);
        })
      ),
    { dispatch: false }
  );

  deleteRecord$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<DeleteRecordAction>(RecordActionTypes.DeleteRecord),
        map((action) => {
          if (action && action.payload && action.payload.length > 0) {
            this.deleteRecord(action.payload);
          } else {
            this.store
              .select(getAppSelection)
              .pipe(take(1))
              .subscribe((selection) => {
                if (selection && selection.count > 0) {
                  this.deleteRecord(selection.nodes);
                }
              });
          }
        })
      ),
    { dispatch: false }
  );

  private openRecordDialogComponent(action: any, recordActionType: RecordActionTypes) {
    if (action && action.payload && action.payload.length > 0) {
      this.recordService.openRecordDialogComponent(action, recordActionType);
    } else {
      this.store
        .select(getAppSelection)
        .pipe(take(1))
        .subscribe((selection) => {
          if (selection && selection.count > 0) {
            const UUIDs = selection.nodes.map((nodeEntry) => nodeEntry.entry.id);
            this.recordService.openRecordDialogComponent(UUIDs, recordActionType);
          }
        });
    }
  }

  private deleteRecord(items: MinimalNodeEntity[]) {

  }
}
