// 作者模型
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const moment = require('moment')
const AuthorSchema = new Schema({
  first_name: {
    type: String,
    require: true,
    max: 100
  },
  family_name: {
    type: String,
    require: true,
    max: 100
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  }
})

// 虚拟属性'name'：表示作者全名
AuthorSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ',' + this.first_name;
  });

// 虚拟属性'lifespan'：表示作者寿命
AuthorSchema
  .virtual('lifespan')
  .get(function () {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
  });

// // 虚拟属性'url'：表示作者 URL
AuthorSchema
  .virtual('url')
  .get(function () {
    return '/catalog/author/' + this._id;
  })
AuthorSchema
  .virtual('date_of_birth_formatted')
  .get(function () {
    return moment(this.date_of_birth).format('MMMM Do, YYYY');
  })
AuthorSchema
  .virtual('date_of_death_formatted')
  .get(function () {
    return moment(this.date_of_death).format('MMMM Do, YYYY');
  })
module.exports = mongoose.model('Author', AuthorSchema); 