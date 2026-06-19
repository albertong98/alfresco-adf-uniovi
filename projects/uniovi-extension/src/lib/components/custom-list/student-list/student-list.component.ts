import { Component } from "@angular/core";

@Component({
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent { 

    listId: string = 'student-list';
    constructor() {}
}