'use strict'
// import _ from 'lodash';
// require('./mystyle.css');引入css文件打包
// require('./youstyle.css');
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const path = require('path');
// const stafiles = require('koa-static');
// var moment = require('moment');
// console.log(moment().format());
// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 导入controller middleware:
const controller = require('./controller');
const isProduction = process.env.NODE_ENV === 'production';
const templating = require('./templating');
// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  var
    start = new Date().getTime(),
    execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// app
// static file support:
if (!isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(bodyParser());

app.use(templating('views', {
  noCache: !isProduction,
  watch: !isProduction
}));

// app.use(router.routes());
// add router middleware:
app.use(controller());
app.listen(8080);
console.log('app started at port 8080...');
