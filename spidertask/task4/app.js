const Koa = require('koa')
const app = new Koa()
const server = require('koa-static')
const bodyParser = require('koa-bodyparser')

// 连接数据库
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/spider', {
  useMongoClient: true
});
// Use `db`, for instance `db.model()`
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('mongoose connected!')
});
// 添加数据库连接失败和打开时的回调

// 定义一个Schema
const resultSchema = new mongoose.Schema({
  code: Number,
  msg: String,
  word: String,
  device: String,
  time: Number,
  dataList: [{
    info: String,
    link: String,
    pic: String,
    title: String
  }]
});

// 编译定义好的Schema
var Result = mongoose.model('Result', resultSchema);

app.use(async (ctx) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
console.log('koa2 is working...')
