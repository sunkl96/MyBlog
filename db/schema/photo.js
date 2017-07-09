/**
 * Created by ASUS on 2016/9/6.
 */
var mongoose = require('../db');
var db = mongoose.createConnection('localhost','usr');

var Schema = mongoose.Schema;
var photoSchema = new Schema({
    path:String
});

var Photo = db.model('photo',photoSchema);
module.exports = Photo;