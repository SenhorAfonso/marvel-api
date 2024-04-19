interface IHasResponseBody<T> {
  data: {
    results: T[]
  }
}

export default IHasResponseBody;