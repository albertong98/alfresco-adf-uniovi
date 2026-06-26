import { AppStore, SnackbarErrorAction, SnackbarInfoAction } from "@alfresco/aca-shared/store";
import { AlfrescoApiService, SearchService } from "@alfresco/adf-core";
import { ResultSetPaging } from "@alfresco/js-api";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private alfrescoApiService: AlfrescoApiService, private store: Store<AppStore>,private searchService: SearchService) { }

    createNewItem(formParam:any,path:string){
        this.callApi(formParam,path,'POST','UNIOVI.FORMS.CREATE_SUCCESS_MSG','UNIOVI.FORMS.CREATE_ERROR_MSG');
    }

    updateItem(formParam:any,path:string,id?:string){
        this.callApi(formParam,id ? path+"/"+id : path,'PUT','UNIOVI.FORMS.UPDATE_SUCCESS_MSG','UNIOVI.FORMS.UPDATE_ERROR_MSG');
    }

    private callApi(formParam:any,path:string,method:string,successMsg:string,errorMsg:string){
        const httpMethod = method;
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
        .then(() => this.store.dispatch(new SnackbarInfoAction(successMsg)))
        .catch(() => this.store.dispatch(new SnackbarErrorAction(errorMsg)));
    }

    getNodesByType(type: string): Observable<ResultSetPaging> {
        const searchRequest = {
            query: {
                query: `TYPE:'${type}'`
            },
            paging: {
                maxItems: 1000,
                skipCount: 0
            },
            include: ['properties']
        };

        return this.searchService.searchByQueryBody(searchRequest);
    }
}