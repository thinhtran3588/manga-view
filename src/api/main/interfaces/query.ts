export type SortOrder = 'ASC' | 'DESC';

export type Query = {
  queryId?: string;
  /** example: ['name|DESC', 'createdAt|ASC'] */
  sortBy?: string[];
};

export interface OffsetQuery extends Query {
  pageIndex?: number;
  rowsPerPage?: number;
}

export interface CursorQuery extends Query {
  rowsPerPage?: number;
  nextPage?: string;
  prevPage?: string;
}

export interface GetByIdQuery<Id = string> {
  id: Id;
}
