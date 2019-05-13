// koa-router 第一个例子
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router
  .get('/', (ctx, next) => {
    ctx.body = '<h1>Hello World</h1>';
  })
  .get('/404', ctx => {
    ctx.body = '<h1>404</h1>';
  })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('app run at 3000');
})
