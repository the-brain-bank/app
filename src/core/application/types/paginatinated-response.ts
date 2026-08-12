export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

export class BasePaginatedResponse<T> {
  
}