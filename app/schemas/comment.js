/**
 * comment.js comment Schema文件
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-05 19:46:57
 * @version $Id$
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
  article: {type: ObjectId, ref: 'Article'},
  author: { type: String, require: true },
  from: {type: ObjectId, ref: 'User'},
  email: { type: String, lowercase: true, match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/ },
  reply: [{
    to: {type: ObjectId, ref: 'Comment'}
  }],
  content: String,
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

CommentSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  next();
});

CommentSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .sort('meta.updateAt')
      .exec(cb);
  }
};

module.exports = CommentSchema;
