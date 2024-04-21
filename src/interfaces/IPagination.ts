interface IPagination {
  limit?: string | number;
  page?: string | number;
  skip?: string | number;
  sort?: string | number;
}

export default IPagination;