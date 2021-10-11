export type QueryResult<T> = {
  data: T[];
};

export type OffsetQueryResult<T> = {
  data: T[];
  pagination: {
    total: number;
    pageIndex: number;
    rowsPerPage: number;
  };
};

export type CursorQueryResult<T> = {
  data: T[];
  pagination: {
    nextPage?: string;
  };
};
