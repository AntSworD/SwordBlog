/**
 * comment.js comment Model文件
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-07 19:14:32
 * @version $Id$
 */

var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
