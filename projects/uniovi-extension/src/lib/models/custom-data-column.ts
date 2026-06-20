import { DataColumn } from "@alfresco/adf-core";
import { KeyValue } from "@angular/common";

export interface CustomDataColumn extends DataColumn{
    search: {
        type: string;
        options: KeyValue<string, string>[];
    };
}