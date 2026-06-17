import { AppStore, SnackbarErrorAction, SnackbarInfoAction } from "@alfresco/aca-shared/store";
import { AlfrescoApiService } from "@alfresco/adf-core";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private alfrescoApiService: AlfrescoApiService, private store: Store<AppStore>) { }

    createNewItem(formParam:any,path:string){
        const httpMethod = 'POST';
        const pathParams = {};
        const queryParams = {};
        const headerParams = {};
        const bodyParam = {};
        const contentTypes = ['multipart/form-data'];
        const accepts = ['text/plain'];
        const returnType = '';
        const url = 'alfresco/service';

        this.alfrescoApiService
            .getInstance()
            .contentClient.callApi(
                path,
                httpMethod,
                pathParams,
                queryParams,
                headerParams,
                formParam,
                bodyParam,
                contentTypes,
                accepts,
                returnType,
                url
        )
        .then(() => this.store.dispatch(new SnackbarInfoAction('UNIOVI.FORMS.SUCCESS_MSG')))
        .catch(() => this.store.dispatch(new SnackbarErrorAction('UNIOVI.FORMS.ERROR_MSG')));
    }
}