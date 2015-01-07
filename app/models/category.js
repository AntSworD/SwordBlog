/**
 * category.js category Model文件
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-07 19:13:19
 * @version $Id$
 */

var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
