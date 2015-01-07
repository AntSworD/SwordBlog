/**
 * tag.js tag Model文件
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-07 19:18:02
 * @version $Id$
 */

var mongoose = require('mongoose');
var TagSchema = require('../schemas/tag');
var Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;
