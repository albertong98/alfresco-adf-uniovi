import { ImageResolver } from "@alfresco/adf-content-services";
import { DataColumn, DataRow } from "@alfresco/adf-core";
import { Component } from "@angular/core";

@Component({
    templateUrl: './student-task-list.component.html',
    styleUrls: ['./student-task-list.component.scss'],
})
export class StudentTaskListComponent { 

    listId: string = 'student-task-list';
    constructor() {}
 
    customImageResolver: ImageResolver = (row: DataRow, col: DataColumn) => {
        if (col.id == "student-task-list.status-img") {
            let status = row.node.entry.properties["uo:status"]
            return `assets/uniovi-extension/images/${status}.png`;
        }
        return null;
    };
}