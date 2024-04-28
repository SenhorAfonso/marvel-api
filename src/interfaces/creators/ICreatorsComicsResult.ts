interface ICreatorsComicResult {
  comics: {
    available: number,
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  }
}

export default ICreatorsComicResult;