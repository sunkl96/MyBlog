/**
 * Created by ASUS on 2016/6/30.
 */
var mongoose = require('../db');
var Schema = mongoose.Schema;


/* 用户定义 */
var userSchema = new Schema({
    username: String,
    password: String,
    email:    String,
    address:  String,
    meta: {
        updateAt: {type:Date, default: Date.now()},
        createAt: {type:Date, default: Date.now()}
    }
});

var User = mongoose.model('User', userSchema);
// user = new User({
//     username: 'ss',
//     password: 'aa',
//     email:    '446874146@qq.com',
//     address:  'xx'
// })
// user.save(function(err, doc) {
//   if (err) {
//     console.log('error')
//   } else {
//     console.log(doc)
//   }
// })
//   var conditions = {email:'ss'};
//   User.remove(conditions,function(error){
//     if(error){
//       console.log(error);
//     }else{
//       console.log('Delete success!');
//     }
//   });


userSchema.pre('save', function (next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
})


module.exports = mongoose.model('User', userSchema);