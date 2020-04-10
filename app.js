 const express = require('express');
 const app = express();
 // 时间格式化
 const moment = require('moment');
 // 解决跨域
 const cors = require('cors');
 // 解析表单插件
 var bodyParser = require('body-parser');
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));
 var mysql = require('mysql');

 // 创建数据库
 var db = mysql.createConnection({
     host: '127.0.0.1',
     user: 'root',
     password: '123',
     database: 'test_library',
 });
 db.connect(err => {
     if (err) throw err;
     console.log('数据库链接成功');
 });

 // 解决跨域
 //  app.all('*',function(req,res,next){
 //     res.header("Access-Control-Allow-Origin", "*");
 //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
 //     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
 //     res.header("X-Powered-By", ' 3.2.1');
 //     res.header("Content-Type", "application/json;charset=utf-8");
 //     next();
 // });

 // 创建表
 app.get('/createcontenttable', (req, res) => {
     let sql = 'create table content(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))'
     db.query(sql, (err, result) => {
         if (err) return res.json({ code: 1, msg: '数据表创建失败' })
         res.json({ code: 0, msg: '数据表创建成功' })
     })
 })

 // 查询内容
 app.get('/login/:id', (req, res) => {
     let sqlStr = `select * from user_info where id = ${req.params.id}`
     db.query(sqlStr, (err, results) => {
         if (err) return res.json({ code: 1, msg: '账号密码错误', data: {} })
         res.json({ code: 0, msg: '登录成功', data: results })
     })
 })

 // 修改内容
 app.get('/update/:id', (req, res) => {
     let userName = '1101'
     let sql = `update user_info set user_name = ${userName} where id = ${req.params.id}`
     db.query(sql, (err, result) => {
         if (err) return res.json({ code: 1, msg: '修改失败' })
         res.json({ code: 0, msg: '修改成功' })
     })
 })

 // 新增内容
 app.get('/add', (req, res) => {
     let sql = 'INSERT INTO user_info(user_name,password) VALUES(?,?)';
     let user = ['隔壁老李', '123456'];
     db.query(sql, user, (err, result) => {
         if (err) return res.json({ code: 1, msg: '新增失败' })
         res.json({ code: 0, msg: '新增成功' })
     })
 })

 // 删除内容
 app.get('/del/:id', (req, res) => {
     let sql = `delete from user_info where id = ${req.params.id}`
     db.query(sql, (err, result) => {
         if (err) return res.json({ code: 1, msg: '删除失败' })
         res.json({ code: 0, msg: '删除成功' })
     })
 })



 app.listen(3000, () => {
     console.log('正在监听端口3000');
 });