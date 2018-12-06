 var express = require('express');
 var app = express();
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

 app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
 app.get('/user',function(req,res) {
 	var sql = "select * from weblist"
 	connection.query(sql,function (error,result,fields) {
 		res.send(result);
 	})
 })

 app.listen(3000);