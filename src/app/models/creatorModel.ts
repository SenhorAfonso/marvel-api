import mongoose from 'mongoose';

const creatorSchema = new mongoose.Schema({
  name: {
    type: String
  },
  role: {
    type: String
  },
  sagaComic: {
    type: String
  },
  otherComics: {
    type: [String]
  },
  collectionSize: {
    type: Number
  }
});

export default mongoose.model('creatorModel', creatorSchema);