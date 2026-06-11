import { KeyValue } from "@angular/common";

export class Status {
    status: string | KeyValue<string, string>;
    constructor(status: string) {
        this.status = status;
    }
}