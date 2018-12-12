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
 	extended:true
 }));
 var mysql = require('mysql');
 var connection = mysql.createConnection({
 	host:'127.0.0.1',
 	user:'root',
 	password:'root',
 	database:'test',
 });
 connection.connect();

// 解决跨域
//  app.all('*',function(req,res,next){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
 app.get('/getUser',function(req,res) {
 		const sqlStr = 'select * from user '
 		connection.query(sqlStr,(err,results) => {
 			if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
        res.json({ err_code: 200, message: results, affextedRows: results.affextedRows })
 		})
 })

 app.listen(3000,() => {
 	console.log('正在监听端口3000,http://localhost:3000');
 });