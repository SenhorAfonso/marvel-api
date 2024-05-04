interface IAddNewCreator {
  name: string
  role: string,
  sagaComic: string,
  otherComics: Array<string>,
  collectionSize?: number
}

export default IAddNewCreator;