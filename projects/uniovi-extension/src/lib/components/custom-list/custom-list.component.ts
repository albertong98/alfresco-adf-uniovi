import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';

import {
    AlfrescoApiService,
    ContentService,
    CustomEmptyContentTemplateDirective,
    CustomLoadingContentTemplateDirective,
    CustomNoPermissionTemplateDirective,
    DataCellEvent,
    DataColumn,
    DataRow,
    DataRowActionEvent,
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
import { PageComponent } from 'app/src/app/components/page.component';
import { ContentManagementService } from 'app/src/app/services/content-management.service';
import { AppExtensionService } from 'projects/aca-shared/src/lib/services/app.extension.service';
import { CustomDataColumn } from '../../models/custom-data-column';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-custom-list',
    templateUrl: './custom-list.component.html',
    styleUrls: ['./custom-list.component.scss']
})
export class CustomListComponent extends PageComponent implements PaginatedComponent, OnInit, OnChanges {
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
     
    columns: CustomDataColumn[] = [];
    filters: any[] = [];

    nodes!: NodePaging;

    @Input()
    imageResolver: any | null = null;

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

    @Input()
    title: string = '';

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
        content: ContentManagementService,
        extensions: AppExtensionService,
        private extensionService: ExtensionService,
        private contentService: ContentService,
        private thumbnailService: ThumbnailService,
        private ngZone: NgZone,
        private customListQueryBuilderService: CustomListQueryBuilderService,
        store: Store<AppStore>
    ) {
        super(store, extensions, content);
        this._searchApi = new SearchApi(this.alfrescoApiService.getInstance());
    }

    updatePagination(requestPaginationModel: RequestPaginationModel) {
        this._pagination.maxItems = requestPaginationModel.maxItems;
        this._pagination.merge = requestPaginationModel.merge;
        this._pagination.skipCount = requestPaginationModel.skipCount;
        this.reloadData();
    }

    ngOnInit(): void {
        this.loadConfig();
        this.reloadList();
        this.getToolbarActions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.data) {
            if (changes.imageResolver) {
                this.data.setImageResolver(changes.imageResolver.currentValue);
            }
        }
    }

    private loadConfig(): void {
        if (!this.listId) {
            return;
        }
        const config = this.extensionService.features[this.listId as keyof typeof this.extensionService.features];
        this.columns = config?.columns || [];
        console.log(this.columns);
        this.filters = this.columns.filter(col => col.search && !col.search.disabled);
        this.query = config?.baseQuery || '';
        this.customListQueryBuilderService.loadConfiguration(this.columns,this.query);
        this.customListQueryBuilderService.clearAndSetDefaultFilterQueries();
        this.data = new ShareDataTableAdapter(this.thumbnailService, this.contentService,undefined, this.sorting, this.sortingMode, false);
        if(this.imageResolver)
            this.data.setImageResolver(this.imageResolver);
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

    async onShowRowActionsMenu(event: DataCellEvent) {
        console.log(event)
        event.value.actions = this.actions;
    }

    onExecuteRowAction(_event: DataRowActionEvent) {
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

    reloadData(skipCount?: number, notReset?: boolean) {
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
                        if (results) {
                            const nodePaging: NodePaging = {
                                list: {
                                    pagination: results.list?.pagination,
                                    entries: (results.list?.entries || []).map(row => ({
                                        entry: row.entry as any
                                    }))
                                }
                            };
                            this.data.setColumns(this.columns as any as DataColumn[]);
                            this.data.loadPage(nodePaging, false, undefined);
                    
                            this.pagination.next(results.list?.pagination as PaginationModel);
                            this.onDataReady(nodePaging);

                            this.isLoading = false;
                        }
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

    submitFilters(){
        this.customListQueryBuilderService.clearAndSetDefaultFilterQueries();
        this.columns.map(col => col.search).forEach(col => {
            if(col.value)
                this.customListQueryBuilderService.addFilterQuery({query: `@${col.field}:'*${col.value}*'`});
        });
        this.reloadList();
    }

    clearFilters(){
        this.customListQueryBuilderService.clearAndSetDefaultFilterQueries();
        this.columns.forEach(col => {
            if (col.search) {
                col.search.value = null;
            }
        });
        this.reloadList();
    }

    getToolbarActions() {
    // Comprobamos de nuevo la visibilidad de las acciones. Volverá a ejecutarse ngDoCheck
        this.extensions
        .getAllowedToolbarActions()
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((actions) => {
            this.actions = actions;
        });
    }
}