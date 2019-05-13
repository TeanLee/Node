// 通过 koa-router 传递参数
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 参数来自 query 字段
router.get('/', ctx => {
  ctx.body = ctx.query;
})

app.use(router.routes(), router.allowedMethods());

app.listen(3000, () => {
  console.log('app run at 3000');
})
