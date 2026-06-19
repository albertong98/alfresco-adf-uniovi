import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

import {
    AlfrescoApiService,
    ContentService,
    CustomEmptyContentTemplateDirective,
    CustomLoadingContentTemplateDirective,
    CustomNoPermissionTemplateDirective,
    DataColumn,
    DataRow,
    DataSorting,
    DataTableComponent,
    PaginatedComponent,
    PaginationModel,
    RequestPaginationModel,
    ShowHeaderMode,
    ThumbnailService
} from '@alfresco/adf-core';

import { NodeEntry, NodePaging, Pagination, RequestSortDefinition, SearchApi, SearchRequest } from '@alfresco/js-api';
import { ExtensionService } from '@alfresco/adf-extensions';
import { BehaviorSubject } from 'rxjs';
import { ShareDataTableAdapter } from '@alfresco/adf-content-services';
import { CustomListQueryBuilderService } from '../../services/query-builder.service';
import { Store } from '@ngrx/store';
import { AppStore, SnackbarErrorAction } from '@alfresco/aca-shared/store';


@Component({
    selector: 'app-custom-list',
    templateUrl: './custom-list.component.html',
    styleUrls: ['./custom-list.component.scss']
})
export class CustomListComponent implements PaginatedComponent, OnInit {
    query: string = '';

    @ContentChild(CustomEmptyContentTemplateDirective)
    customNoContentTemplate!: CustomEmptyContentTemplateDirective;

    @ContentChild(CustomLoadingContentTemplateDirective)
    customLoadingContent!: CustomLoadingContentTemplateDirective;

    @ContentChild(CustomNoPermissionTemplateDirective)
    customNoPermissionsTemplate!: CustomNoPermissionTemplateDirective

    _searchApi: SearchApi;
    get searchApi(): SearchApi {
        this._searchApi = this._searchApi ?? new SearchApi(this.alfrescoApiService.getInstance());
        return this._searchApi;
    }

    columns: DataColumn[] = [];

    nodes!: NodePaging;

    @Input()
    emptyFolderImageUrl = './assets/images/empty_doc_lib.svg';

    @ViewChild('dataTable', { static: false })
    dataTable!: DataTableComponent;

    @Input()
    listId!: keyof typeof this.extensionService.features | string;

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

    data!: ShareDataTableAdapter;

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

    @Output()
    ready: EventEmitter<NodePaging> = new EventEmitter<NodePaging>();

    @Input()
    sortingMode: 'server' | 'client' = 'client';

    @Input()
    sorting: DataSorting = new DataSorting();

    orderBy: string[] | null = null;

    DEFAULT_SORTING: DataSorting[] = [new DataSorting('name', 'asc'), new DataSorting('isFolder', 'desc')];


    DEFAULT_PAGINATION: Pagination = new Pagination({
        hasMoreItems: false,
        skipCount: 0,
        maItems: 25,
        totalItems: 0
    });

    private _pagination: PaginationModel = this.DEFAULT_PAGINATION;
    pagination: BehaviorSubject<PaginationModel> = new BehaviorSubject<PaginationModel>(this.DEFAULT_PAGINATION);
    sortingSubject: BehaviorSubject<DataSorting[]> = new BehaviorSubject<DataSorting[]>(this.DEFAULT_SORTING);

    constructor(
        private alfrescoApiService: AlfrescoApiService,
        private extensionService: ExtensionService,
        private contentService: ContentService,
        private thumbnailService: ThumbnailService,
        private ngZone: NgZone,
        private customListQueryBuilderService: CustomListQueryBuilderService,
        private store: Store<AppStore>
    ) {
        this._searchApi = new SearchApi(this.alfrescoApiService.getInstance());
    }

    updatePagination(requestPaginationModel: RequestPaginationModel) {
        if (requestPaginationModel)

            throw new Error('Method not implemented.');
    }

    ngOnInit(): void {
        this.loadConfig();
        this.reloadList();
        console.log(this.data)
    }

    private loadConfig(): void {
        if (!this.listId) {
            return;
        }
        const config = this.extensionService.features[this.listId as keyof typeof this.extensionService.features];
        this.columns = config?.columns || [];
        this.query = config?.baseQuery || '';
        this.customListQueryBuilderService.loadConfiguration(this.columns,this.query);
        
        this.data = new ShareDataTableAdapter(this.thumbnailService, this.contentService,undefined, this.sorting, this.sortingMode, false);
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

    refresh(): void {

    }

    private getSortRequest(): RequestSortDefinition[] | undefined {
        const sortRequest: RequestSortDefinition[] | undefined = this.orderBy?.map((order) => new RequestSortDefinition({
            type: 'FIELD',
            field: order.split(' ')[0],
            ascending: order.split(' ')[1] === 'asc'
        }));
        return sortRequest;
    }

    reload(skipCount?: number, notReset?: boolean) {
        if (!notReset)
            this.ngZone.run(() => {
                if (this.nodes) {
                    this.data.loadPage(this.nodes, false, undefined);
                    this.onDataReady(this.nodes);
                } else {
                    this.reloadList(skipCount);
                }
            });
    }

    private reloadList(skipCount?: number) {
        this.customListQueryBuilderService.setPagination(this._pagination.maxItems ?? 1000, skipCount ?? this._pagination.skipCount ?? 0);
        this.customListQueryBuilderService.buildQuery(this.getSortRequest());
        const query: SearchRequest | null = this.customListQueryBuilderService.getCurrentQuery();
        if (query) {
            query.include = ['properties'];
            this.isLoading = true;
            this.ngZone.run(async () => {
                this.searchApi.search(query).then(
                    (results) => {

                        const nodePaging: NodePaging = {
                            list: {
                                pagination: results.list?.pagination,
                                entries: results.list?.entries?.map(row => ({
                                    entry: row.entry as any
                                }))
                            }
                        };
                        this.data.setColumns(this.columns as any as DataColumn[]);
                        this.data.loadPage(nodePaging, false, undefined);
                        this.pagination.next(results.list?.pagination as PaginationModel);
                        this.onDataReady(nodePaging);

                        this.isLoading = false;
                        console.log(this.data.getColumns());
                    },
                    () => {
                       this.store.dispatch(new SnackbarErrorAction('UNIOVI.LISTS.LOADING_ERROR'));
                    }
                );
            });
        }
    }

    private onDataReady(nodePaging: NodePaging) {
        this.ready.emit(nodePaging);
        this.pagination.next(nodePaging.list?.pagination ?? new PaginationModel());
    }
}