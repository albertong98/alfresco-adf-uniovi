import { SelectionState } from "@alfresco/adf-extensions";
import { MinimalNodeEntity } from "@alfresco/js-api";
import { Action } from "@ngrx/store";

export enum SubjectActionTypes {
    CreateSubject = 'CREATE_SUBJECT',
    ViewSubject = 'VIEW_SUBJECT',
    EditSubject = 'EDIT_SUBJECT',
    DeleteSubject = 'DELETE_SUBJECT',
}

export class CreateSubjectAction implements Action {
  readonly type = SubjectActionTypes.CreateSubject;

  constructor(public payload?: SelectionState) {}
}

export class ViewSubjectAction implements Action {
  readonly type = SubjectActionTypes.ViewSubject;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class EditSubjectAction implements Action {
  readonly type = SubjectActionTypes.EditSubject;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class DeleteSubjectAction implements Action {
  readonly type = SubjectActionTypes.DeleteSubject;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}