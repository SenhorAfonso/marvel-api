interface IComicResponseBody {
  title: string,
  description: string,
  dates: [
    {
      type: string,
      date: string
    }
  ],
  thumbnail: {
    path: string,
    extension: string
  },
  creators: {
    collectionURI: string,
    items: [
      {
        resourceURI: string,
        name: string,
        role: string
      }
    ]
  },
  characters: {
    collectionURI: string
  }
};

export default IComicResponseBody;