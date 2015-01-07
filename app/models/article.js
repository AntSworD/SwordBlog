/**
 * article.js article Model文件
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-07 19:08:09
 * @version $Id$
 */

var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/article');
var Article = mongoose.model('Category', ArticleSchema);
module.exports = Article;
