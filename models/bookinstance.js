const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
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
    default: '馆藏维护'
  },
  due_back: {
    type: Date,
    default: Date.now
  }
});

BookInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catalog/bookinstance/' + this._id;
  });

BookInstanceSchema
  .virtual('due_back_formatted')
  .get(function () {
    return moment(this.due_back).format('MMMM Do, YYYY');
  });

module.exports = mongoose.model('BookInstance', BookInstanceSchema);