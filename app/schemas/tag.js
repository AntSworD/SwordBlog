/**
 * tag.js tag Schema文件
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-05 19:55:13
 * @version $Id$
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var TagSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  clickCount: {
    type: Number,
    default: 0
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

TagSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  next();
});

TagSchema.statics = {
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

module.exports = TagSchema;
