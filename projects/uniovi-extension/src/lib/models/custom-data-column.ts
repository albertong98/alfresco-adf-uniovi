import { DataColumn } from "@alfresco/adf-core";

export interface CustomDataColumn extends DataColumn{
    search: {
        type: string;
        options: string[];
        value: any;
        field: any;
        disabled: boolean;
    };
}