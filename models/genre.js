const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 100
  }
});

GenreSchema
  .virtual('url')
  .get(function () {
    return '/catagory/genre/' + this._id;
  });

module.exports = mongoose.model('Genre', GenreSchema);
