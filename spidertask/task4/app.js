'use strict'
// import _ from 'lodash';
// require('./mystyle.css');引入css文件打包
// require('./youstyle.css');
// var moment = require('moment');
// console.log(moment().format());
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 导入controller middleware:
const controller = require('./controller');
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());
// app.use(router.routes());
// add router middleware:
app.use(controller());
app.listen(3000);
console.log('app started at port 3000...');
