import { Component } from "@angular/core";

@Component({
    templateUrl: './student-task-list.component.html',
    styleUrls: ['./student-task-list.component.scss'],
})
export class StudentTaskListComponent { 

    listId: string = 'student-task-list';
    constructor() {}
}