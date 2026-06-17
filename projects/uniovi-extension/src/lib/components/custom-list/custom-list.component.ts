import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

import {
    AlfrescoApiService,
    DataColumn,
    DataRow,
    DataSorting,
    DataTableComponent,
    PaginatedComponent,
    PaginationModel,
    RequestPaginationModel,
    ShowHeaderMode
} from '@alfresco/adf-core';

import { NodeEntry, SearchApi } from '@alfresco/js-api';
import { ExtensionService } from '@alfresco/adf-extensions';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'app-custom-list',
    templateUrl: './custom-list.component.html',
    styleUrls: ['./custom-list.component.scss']
})
export class CustomListComponent implements PaginatedComponent, OnInit{
    listId!: string;
    query: string = '';
    
    pagination: BehaviorSubject<PaginationModel>;

    _searchApi: SearchApi;
    get searchApi(): SearchApi {
        this._searchApi = this._searchApi ?? new SearchApi(this.alfrescoApiService.getInstance());
        return this._searchApi;
    }

    columns:  DataColumn[] = [];

    @ViewChild('dataTable', { static: false })
    dataTable!: DataTableComponent;

    @Input()
    display: string = 'list';

    @Input()
    isLoading = false;

    @Input()
    allowFiltering = true;

    @Input()
    selectionMode: string = 'single';

    @Input()
    stickyHeader = true;

    @Input()
    multiselect = false;

    @Input()
    data: any;

    @Input()
    showHeader: ShowHeaderMode = ShowHeaderMode.Always;

    @Input()
    showMainDatatableActions = true;

    @Output()
    rowDoubleClick = new EventEmitter<NodeEntry>();

    @Output()
    nodeSelect = new EventEmitter<DataRow>();

    @Output()
    nodeUnselect = new EventEmitter<DataRow>();

    @Output()
    sortingChanged = new EventEmitter<DataSorting>();

    @Output()
    showRowActionsMenu = new EventEmitter<any>();

    @Output()
    executeRowAction = new EventEmitter<any>();

    constructor(private alfrescoApiService: AlfrescoApiService,private extensionService: ExtensionService) {
        this._searchApi = new SearchApi(this.alfrescoApiService.getInstance());
    }
    
    updatePagination(requestPaginationModel: RequestPaginationModel) {
        if(requestPaginationModel)

        throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        this.loadConfig();
    }

    private loadConfig(): void {
        if (!this.listId) {
            return;
        }
        const config = this.extensionService.getFeature(this.listId)[0];
        this.columns = config?.columns || [];
        this.query = config?.baseQuery || '';
    }

    onRowDbClick(node: NodeEntry): void {
        this.rowDoubleClick.emit(node);
    }

    onNodeSelect(row: DataRow): void {
        this.nodeSelect.emit(row);
    }

    onNodeUnselect(row: DataRow): void {
        this.nodeUnselect.emit(row);
    }

    onSortingChanged(event: DataSorting): void {
        this.sortingChanged.emit(event);
    }

    onShowRowActionsMenu(event: any): void {
        this.showRowActionsMenu.emit(event);
    }

    onExecuteRowAction(event: any): void {
        this.executeRowAction.emit(event);
    }

    clearSelection(): void {
       // this.dataTable?.clearSelection();
    }

    selectRow(row: DataRow): void {
        this.dataTable?.selectRow(row, true);
    }

    reload(): void {
        
    }

    refresh(): void {
       
    }
/*
    reload(skipCount?: number, notReset?: boolean) {
        if(!notReset)
        this.resetSelection();
        this.ngZone.run(() => {
        if (this.nodes) {
            this.data.loadPage(this.nodes, false, null);
            this.onDataReady(this.nodes);
        } else {
            this.reloadList(skipCount);
        }
        });
    }

    private reloadList(skipCount?: number) {
        //console.debug("***********************RELOAD LIST***********************");
        this.customListQueryBuilderService.setPagination(this._pagination.maxItems, skipCount ?? this._pagination.skipCount);
        this.customListQueryBuilderService.buildQuery(this.getSortRequest());
        const query: SearchRequest = this.customListQueryBuilderService.getCurrentQuery();
        if(query){
        this.isLoading = true;
        this.ngZone.run(async () => {
            this.searchApi.search(query).then(
            (results: NodePaging) => {
                this.data.loadPage(results, false, null);
                this.pagination.next(results.list.pagination);
                this.onDataReady(results);

                this.customListService.dataLength = results.list?.entries?.length ?? 0;
                this.refreshToolbarActions.emit();

                this.isLoading = false;
            },
            (err) => {
                this.logger.debug(err);

                this.customListService.dataLength = 0;
                this.refreshToolbarActions.emit();
                this.isLoading = false;
            }
            );
        });
        }
    }

    private onDataReady(nodePaging: NodePaging) {
        this.ready.emit(nodePaging);
        this.pagination.next(nodePaging.list.pagination);
    }*/
}