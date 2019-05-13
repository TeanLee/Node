// 增加路由层级
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

let home  = new Router();
home
  .get('/world', async ctx => {
    ctx.body = '<h1>This is Home - world.</h1>'
  })
  .get('/todo', async ctx => {
    ctx.body = '<h1>This is Home - todo.</h1>'
  })

let page = new Router();
page
  .get('/world', ctx => {
    ctx.body = '<h1>This is Page - world.</h1>'
  })
  .get('/todo', ctx => {
    ctx.body = '<h1>This is Page - todo.</h1>'
  })


// 装载子路由  给路由增加前缀
let router = new Router();
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());

// 加载路由中间键
router.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('[demo] server is starting at port 3000');
});
