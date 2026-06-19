import { Component } from "@angular/core";

@Component({
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent { 

    listId: string = 'task-list';
    constructor() {}
}