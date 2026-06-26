import { SelectionState } from "@alfresco/adf-extensions";
import { MinimalNodeEntity } from "@alfresco/js-api";
import { Action } from "@ngrx/store";

export enum SubjectActionTypes {
    CreateSubject = 'CREATE_SUBJECT',
    Enroll = "ENROLL"
}

export class CreateSubjectAction implements Action {
  readonly type = SubjectActionTypes.CreateSubject;

  constructor(public payload?: SelectionState) {}
}

export class EnrollAction implements Action {
  readonly type = SubjectActionTypes.Enroll;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}