const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    require: true
  },
  imprint: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true,
    enum: ['可供借阅', '馆藏维护', '已借出', '保留'],
    defaut: '馆藏维护'
  },
  due_back: {
    type: Date,
    default: Date.now
  }
});

BookInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catagory/bookinstance/' + this._id;
  });

module.exports = mongoose.model('BookInstance', BookInstanceSchema);