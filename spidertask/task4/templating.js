const nunjucks = require('nunjucks');

function createEnv (path, opts) {
  var
    autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefinded = opts.throwOnUndefinded || false,
    env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
              noCache: noCache,
              watch: watch
            }), {
              autoescape: autoescape,
              throwOnUndefined: throwOnUndefinded
            }
        );
  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

function templating (path, opts) {
  var env = createEnv(path, opts);
  return async (ctx, next) => {
    ctx.render = function (views, model) {
      ctx.response.body = env.render(views, Object.assign({}, ctx.state || {}, model || {}));
      ctx.response.type = 'text/html';
    };
    await next();
  }
}
module.exports = templating;
