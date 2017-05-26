const fs = require('fs');
const path = require('path');
function addMapping (router, mapping) {
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers (router) {
  let filePath = path.join(__dirname, '/controllers');
  var files = fs.readdirSync(filePath);
  var jsFiles = files.filter((f) => {
    return f.endsWith('.js');
  });

  for (var f of jsFiles) {
    console.log(`process controller: ${f}...`);
    let jsfilesPath = path.join(__dirname, '/controllers/', f);
    let mapping = require(jsfilesPath);
    addMapping(router, mapping);
  }
}
module.exports = function (dir) {
  var
    controllersDir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
    router = require('koa-router')();
  addControllers(router, controllersDir);
  return router.routes();
};