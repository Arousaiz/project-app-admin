export type ApiData<T> = {
  data: T[];
  paginated: {
    total_records: number;
    limit: number;
    offset: number;
  };
};
