// 静态资源的引用
// 没有使用静态资源的引用，不能通过文件目录访问
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

// 当前配置了 static 的路径，因此在路径上不需要体现static，只需要是http://127.0.0.1:3000/WechatIMG5.jpeg
const staticPath = './static';

app.use(static(path.join(__dirname, staticPath)));

app.use(async ctx => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('[demo] static-use-middleware is starting at port 3000')
})