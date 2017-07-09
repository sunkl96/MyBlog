/**
 * Created by ASUS on 2016/6/30.
 */
var mongoose = require('../db');
var Schema = mongoose.Schema;

var con = mongoose.createConnection('localhost','usr');


/* 用户定义 */
var newsSchema = new Schema({
    title: String,
    content: String,
    comments:Array,//新增comments数组，用来存放每条文章下边的评论
    meta: {
        updateAt: {type:Date, default: Date.now()},
        createAt: {type:Date, default: Date.now()}
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pv:0
});
///////////////////////////////////////
// var News = mongoose.model('News', newsSchema);
// news = new News({
//     title: 'sdkfajdfhakdsjhf',
//     content: 'sdkafsdhfkjashdfkhaksjdhfkjdshfkjahsdjfkhdshf'
//
// })
// news.save(function(err, doc) {
//   if (err) {
//     console.log('error')
//   } else {
//     console.log(doc)
//   }
// })
// var conditions = {title: 'sdkfajdfhakdsjhf'};
// News.remove(conditions,function(error){
//   if(error){
//     console.log(error);
//   }else{
//     console.log('Delete success!');
//   }
// });
newsSchema.pre('save', function (next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
})

//改
// module.exports = mongoose.model('News', newsSchema);

var News = con.model('new',newsSchema);
module.exports = News;