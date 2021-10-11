export type QueryResult<E> = {
  data: E[];
  error?: string;
  errorCode?: string;
};

export type OffsetQueryResult<E> = QueryResult<E> & {
  pagination: {
    total: number;
    pageIndex: number;
    rowsPerPage: number;
  };
};

export type CursorQueryResult<E> = QueryResult<E> & {
  pagination: {
    nextPage?: string;
  };
};
