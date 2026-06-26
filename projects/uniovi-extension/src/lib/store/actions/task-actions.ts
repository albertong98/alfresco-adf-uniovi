import { SelectionState } from "@alfresco/adf-extensions";
import { MinimalNodeEntity } from "@alfresco/js-api";
import { Action } from "@ngrx/store";

export enum TaskActionTypes {
    CreateTask = 'CREATE_TASK',
    SubmitTask = 'SUBMIT_TASK',
    ViewTaskDocuments = "VIEW_TASK_DOCUMENTS",
    ViewParentTaskDocuments = "VIEW_PARENT_TASK_DOCUMENTS",
}

export class CreateTaskAction implements Action {
  readonly type = TaskActionTypes.CreateTask;

  constructor(public payload?: SelectionState) {}
}

export class SubmitTaskAction implements Action{
  readonly type = TaskActionTypes.SubmitTask;
  
  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class ViewTaskDocuments implements Action{
  readonly type = TaskActionTypes.ViewTaskDocuments;
  
  constructor(public payload: MinimalNodeEntity[] = []) {}
}

export class ViewParentTaskDocuments implements Action{
  readonly type = TaskActionTypes.ViewParentTaskDocuments;
  
  constructor(public payload: MinimalNodeEntity[] = []) {}
}