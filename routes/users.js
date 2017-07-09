var express = require('express');
var router = express.Router();
var dbHelper = require('../db/dbhelper');
var entries=require("../db/schema/entries");
var multer  = require('multer');
var markdown = require('markdown').markdown;
var Photo = require('../db/schema/photo');
/* GET users listing. */
var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './public/images')
  },
  filename: function (req, file, cb){
    cb(null, file.originalname)
  }
});
var upload = multer({
  storage: storage
});
router.get('/news', function(req, res, next) {
  res.render('./admin/news', { layout: 'admin',entries:entries});
});
router.get('/newsDelete/:id', function(req, res, next) {

    var id = req.params.id;
    console.log(id);
    News.findOne({_id:id})
        .exec(function(err, doc) {
            if (doc) {
                doc.remove(function (err, doc) {
                    if (err) {
                        console.log("error");
                    }else{
                        console.log('删除新闻成功！');
                        res.redirect("/blog");
                    }
                });
            } else {
                next(err);
            }
        });
});
router.post('/news', function(req, res, next) {
  dbHelper.addNews(req.body, function (success, doc) {
    res.send(doc);
  })
});
/////////////////////图片
router.get('/uploadImg',function (req, res, next) {
    res.render('./users/uploadImg',{ layout:'admin',entries:entries});
})

router.post('/uploadImg', upload.single('filed'), function (req, res) {//post传到后台
    console.log(req.file);
    var path = '/images/'+ req.file.filename;
    console.log(path);
    var photo = new Photo({
        path: path
    });
    photo.save(function(err){
        if (err) {
            console.log('wrong');
        }else{
            console.log('right');
            entries.path = path;
            // return res.send({path: path});
            res.redirect('/admin/news');
        }
    })
});
module.exports = router;
