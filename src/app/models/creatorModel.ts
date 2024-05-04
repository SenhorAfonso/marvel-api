import mongoose from 'mongoose';

const creatorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is a required field!']
  },
  role: {
    type: String,
    require: [true, 'Role is a required field!']
  },
  sagaComic: {
    type: String,
    require: [true, 'SagaComic is a required field!']
  },
  otherComics: {
    type: [String],
    require: [true, 'otherComics is a required field!']
  },
  collectionSize: {
    type: Number,
    require: [true, 'CollectionSize is a required field!']
  }
});

export default mongoose.model('creatorModel', creatorSchema);