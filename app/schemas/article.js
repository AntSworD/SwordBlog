/**
 * article.js article Schema文件
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-05 19:07:34
 * @version $Id$
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
  authorId: {
    type: ObjectId,
    required: true,
    index: true,
    ref: 'User'
  },
  content: String,
  title: {
    type: String,
    required: true,
    index: true
  },
  hidden: {
    type: Boolean,
    default: false
  },
  pv: {
    type: Number,
    default: 0
  },
  category: {
    type: ObjectId,
    required: true,
    ref: 'Category'
  },
  tag: [{
    type: ObjectId,
    ref: 'Tag'
  }],
  meta: {

    publishAt: {
      type: Date,
      required: true
    },
    updateAt: {
      type: String,
      required: true,
      default: Date.now
    }
  }
});

ArticleSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.publishAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }

  next();
});

ArticleSchema.statics = {
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

module.exports = ArticleSchema;
