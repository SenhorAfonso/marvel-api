interface IPagination {
  limit: number;
  page: number;
  skip: number;
  sort: string;
}

export default IPagination;