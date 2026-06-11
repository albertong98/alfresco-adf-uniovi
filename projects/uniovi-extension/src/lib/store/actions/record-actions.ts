import { SelectionState } from "@alfresco/adf-extensions";
import { MinimalNodeEntity } from "@alfresco/js-api";
import { Action } from "@ngrx/store";

export enum RecordActionTypes {
    CreateRecord = 'CREATE_RECORD',
    ViewRecord = 'VIEW_RECORD',
    EditRecord = 'EDIT_RECORD',
    DeleteRecord = 'DELETE_RECORD',
}

export class CreateRecordAction implements Action {
  readonly type = RecordActionTypes.CreateRecord;

  constructor(public payload?: SelectionState) {}
}

export class ViewRecordAction implements Action {
  readonly type = RecordActionTypes.ViewRecord;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class EditRecordAction implements Action {
  readonly type = RecordActionTypes.EditRecord;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class DeleteRecordAction implements Action {
  readonly type = RecordActionTypes.DeleteRecord;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}