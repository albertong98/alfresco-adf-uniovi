import { SelectionState } from "@alfresco/adf-extensions";
import { Action } from "@ngrx/store";

export enum StudentActionTypes {
    CreateStudent = 'CREATE_STUDENT'
}

export class CreateStudentAction implements Action {
  readonly type = StudentActionTypes.CreateStudent;

  constructor(public payload?: SelectionState) {}
}