interface ICreatorsComicResult {
  comics: {
    items: [
      {
        resourceURI: string,
        name: string
      }
    ]
  }
}

export default ICreatorsComicResult;