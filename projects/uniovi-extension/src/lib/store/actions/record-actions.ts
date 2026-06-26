import { SelectionState } from "@alfresco/adf-extensions";
import { Action } from "@ngrx/store";

export enum RecordActionTypes {
    CreateRecord = 'CREATE_RECORD'
}

export class CreateRecordAction implements Action {
  readonly type = RecordActionTypes.CreateRecord;

  constructor(public payload?: SelectionState) {}
}