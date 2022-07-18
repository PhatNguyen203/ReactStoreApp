export interface MetaData {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
}

export class PaginationResponse<T> {
  items: T;
  metaData: MetaData;
  constructor(items: T, metaData: MetaData) {
    this.items = items;
    this.metaData = metaData;
  }
}
