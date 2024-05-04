interface IUpdateCreatorInfo {
  creatorID: string;
  name: string;
  role: string;
  sagaComic: string;
  otherComics: string[];
  collectionSize?: number;
}

export default IUpdateCreatorInfo;