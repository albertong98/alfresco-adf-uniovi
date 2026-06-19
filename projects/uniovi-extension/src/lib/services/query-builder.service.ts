import { Injectable } from '@angular/core';
import { FilterQuery } from '@alfresco/adf-content-services';
import { QueryBody,RequestPagination, SearchRequest } from '@alfresco/js-api';
import { BehaviorSubject, Subject } from 'rxjs';
import { DataColumn, UserPreferencesService, UserPreferenceValues } from '@alfresco/adf-core';
import { DateAdapter } from '@angular/material/core';
import { Moment } from 'moment';
import { ExtensionService } from '@alfresco/adf-extensions';
import { CustomFilterQuery } from '../models/custom-filter-query';

@Injectable({
  providedIn: 'root'
})
export class CustomListQueryBuilderService {
  error = new Subject();
  columns: DataColumn[] = [];
  paging: RequestPagination | undefined = undefined;
  currentQuery: SearchRequest | null = null;

  private filterQueriesSubject = new BehaviorSubject<CustomFilterQuery[]>([]);
  filterQueries$ = this.filterQueriesSubject.asObservable();

  defaultFilterQueries: FilterQuery[] = [];
  baseQuery: string = '';

  constructor(private readonly dateAdapter: DateAdapter<Moment>, private readonly userPreferencesService: UserPreferencesService, protected extensions: ExtensionService) {
    this.userPreferencesService.select(UserPreferenceValues.Locale).subscribe((locale) => {
      this.dateAdapter.setLocale(locale);
    });
  }

  loadConfiguration(columns: DataColumn[],baseQuery:string): void {
    this.baseQuery = baseQuery;
    this.columns = columns;
  }

  buildQuery(sorting:any): void {
    if (!this.baseQuery) {
      this.baseQuery = "*";
    }

    const filterQueries = this.getBasicFilterQueries();
    const result: QueryBody = {
      query: {
        query: this.baseQuery,
        language: 'afts'
      },
      paging: this.paging,
      filterQueries: filterQueries,
      sort: sorting,
    };
    this.currentQuery = result;
  }

  getCurrentQuery() {
    return this.currentQuery;
  }

  setPagination(maxItems: number, skipCount: number) {
    if (!this.paging || (this.paging && this.paging.maxItems !== maxItems) || this.paging.skipCount !== skipCount) {
      this.paging = { maxItems, skipCount };
    }
  }

  public getColumn(columnKey: string): DataColumn | null {
    return this.columns.find((columns) => columns.key === columnKey) ?? null;
  }

  getBasicFilterQueries(): FilterQuery[] {
    const filterQueries: FilterQuery[] = [];
    this.getFilterQueries().forEach(filterQuery => {
      filterQueries.push(filterQuery.query);
    });
    return filterQueries;
  }

  getFilterQueries(): CustomFilterQuery[] {
    return this.filterQueriesSubject.value;
  }

  setDefaultFilterQueries() {
    this.defaultFilterQueries?.forEach(filterQuery => {
      this.addFilterQuery({ id: 'customDefault', query: filterQuery });
    });
  }

  setFilterQueries(filterQueries: CustomFilterQuery[]) {
    this.filterQueriesSubject.next(filterQueries);
  }

  addFilterQuery(filterQuery: CustomFilterQuery) {
    const currentQueries = this.getFilterQueries();
    this.setFilterQueries([...currentQueries, filterQuery]);
  }

  removeFilterQuery(filterQueryId: any) {
    const currentQueries = this.getFilterQueries();
    this.setFilterQueries(currentQueries.filter(filterQuery => filterQuery.id !== filterQueryId));
  }

  clearAndSetDefaultFilterQueries() {
    this.setFilterQueries([]);
    this.setDefaultFilterQueries();
  }
}
