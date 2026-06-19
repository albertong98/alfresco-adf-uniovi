import { Component } from "@angular/core";

@Component({
    templateUrl: './record-list.component.html',
    styleUrls: ['./record-list.component.scss'],
})
export class RecordListComponent { 

    listId: string = 'record-list';
    constructor() {}
}