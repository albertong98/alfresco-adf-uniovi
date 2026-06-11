import { RecordActionTypes } from "../store/actions/record-actions";

export class RecordService {
    openRecordDialogComponent(action: any, recordActionType: RecordActionTypes) {
        if(action && recordActionType)
        throw new Error("Method not implemented.");
    }
    openCreateRecordDialogComponent() {
        throw new Error("Method not implemented.");
    }
}