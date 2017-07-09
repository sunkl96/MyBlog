/**
 * Created by ASUS on 2016/9/6.
 */
var mongoose = require('../db');
var dbl = mongoose.createConnection('localhost','usr');

var Schema = mongoose.Schema;
var commentSchema = new Schema({
    // name: String,
    time: String,
    // title: String,
    comment: String
});

var Comment = dbl.model('comment',commentSchema);
module.exports = Comment;