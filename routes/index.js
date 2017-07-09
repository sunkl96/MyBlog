var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dbHelper = require('../db/dbhelper');
var entries=require('../db/schema/entries');
var User = require('../db/schema/user');
var News = require('../db/schema/news');
var Comments = require('../db/schema/comment');
var config = require('../config');


var fs = require('fs');
// router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  // mongoose.connect('mongodb://127.0.0.1:27017/text');
  //
  //
  // var Schema = mongoose.Schema;
  //
  // var blogSchema = new Schema({
  //   title:  String,
  //   author: String,
  //   body:   String
  // });
  //
  // var Blog = mongoose.model('Blog', blogSchema);
//添加
  // blog = new Blog({
  //   title: 'aaa',
  //   author: 'bbb',
  //   body:   'ccc'
  // })

  // blog.save(function(err, doc) {
  //   if (err) {
  //     console.log('error')
  //   } else {
  //     console.log(doc)
  //   }
  // })
  //查询
// Blog.find({'title':'ddd'},function(error,data){
//   console.log(data);
// })
//   删除
//   var conditions = {title:'aaa'};
//   Blog.remove(conditions,function(error){
//     if(error){
//       console.log(error);
//     }else{
//       console.log('Delete success!');
//     }
//   });
  //更新
//   var condition = {title:'ddd'};
//   var update = {$set :{author:'xx'}};
//   Blog.update(condition,update,function(error,data){
//     if(error){
//       console.log(error);
//     }else{
//       console.log(data);
//     }
//   })
// });


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
/////////////////////////////////////////////
// router.get('/blog', function(req, res, next) {
//   res.render('blog', { layout: 'main' });
// });
router.get('/blogs/:id', function(req, res, next) {

  var id = req.params.id;
  dbHelper.findNewsOne(req, id, function (success, data) {
    res.render('blogs', {
      entries: data,
    });
  })
});


router.get('/blogs', function(req, res, next) {
  dbHelper.findNews(req, function (success, data) {
    res.render('blogs', {
      entries: data.results,
      pageCount: data.pageCount,
      pageNumber: data.pageNumber,
      count: data.count,
    });
  })
});

router.get('/login', function(req, res, next) {
  res.render('login', { layout: 'lg' });
});
/////////////////////注册界面////////////////////
router.get('/register', function(req, res, next) {
  res.render('register', {  layout: 'reg' });
});
router.post('/register', function(req, res, next) {
  dbHelper.addUser(req.body, function (success, doc) {
    res.send(doc);
  })
});
//调用数据库操作
router.post('/login', function(req, res, next) {
  dbHelper.findUsr(req.body, function (success, doc) {
    res.send(doc);
  })
});

module.exports = router;