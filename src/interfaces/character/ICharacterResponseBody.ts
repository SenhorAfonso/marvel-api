interface ICharacterResponseBody {
  name: string;
  description: string;
  comics: {
    available: number;
  }
  thumbnail: {
    path: string;
    extension: string;
  };
}

export default ICharacterResponseBody;
