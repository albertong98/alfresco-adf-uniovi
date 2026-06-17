import { SelectionState } from "@alfresco/adf-extensions";
import { MinimalNodeEntity } from "@alfresco/js-api";
import { Action } from "@ngrx/store";

export enum StudentActionTypes {
    CreateStudent = 'CREATE_STUDENT',
    ViewStudent = 'VIEW_STUDENT',
    EditStudent = 'EDIT_STUDENT',
    DeleteStudent = 'DELETE_STUDENT',
}

export class CreateStudentAction implements Action {
  readonly type = StudentActionTypes.CreateStudent;

  constructor(public payload?: SelectionState) {}
}

export class ViewStudentAction implements Action {
  readonly type = StudentActionTypes.ViewStudent;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class EditStudentAction implements Action {
  readonly type = StudentActionTypes.EditStudent;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class DeleteStudentAction implements Action {
  readonly type = StudentActionTypes.DeleteStudent;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}