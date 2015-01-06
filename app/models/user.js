/**
 * user.js user Model文件
 * @authors AntSworD (zhengjj.asd@gmail.com)
 * @date    2015-01-06 19:35:30
 * @version $Id$
 */

var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var User = mongoose.model('User', UserSchema);

module.exports = User;
