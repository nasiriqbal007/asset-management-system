export type Pagination = {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};
