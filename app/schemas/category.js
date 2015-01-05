/**
 * category.js category Schema引以为荣
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-05 19:42:01
 * @version $Id$
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'Default'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  article: [{
    type: ObjectId,
    ref: 'Article'
  }],
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

CategorySchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  next();
});

CategorySchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({
        _id: id
      })
      .sort('meta.updateAt')
      .exec(cb);
  }
};

module.exports = CategorySchema;
