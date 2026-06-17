import { SelectionState } from "@alfresco/adf-extensions";
import { MinimalNodeEntity } from "@alfresco/js-api";
import { Action } from "@ngrx/store";

export enum TaskActionTypes {
    CreateTask = 'CREATE_TASK',
    ViewTask = 'VIEW_TASK',
    EditTask = 'EDIT_TASK',
    DeleteTask = 'DELETE_TASK',
}

export class CreateTaskAction implements Action {
  readonly type = TaskActionTypes.CreateTask;

  constructor(public payload?: SelectionState) {}
}

export class ViewTaskAction implements Action {
  readonly type = TaskActionTypes.ViewTask;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class EditTaskAction implements Action {
  readonly type = TaskActionTypes.EditTask;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class DeleteTaskAction implements Action {
  readonly type = TaskActionTypes.DeleteTask;

  constructor(public payload: MinimalNodeEntity[] = []) {}
}