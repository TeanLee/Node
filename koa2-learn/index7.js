// ejs 模板
// 在 koa 中使用模板机制必须依靠中间件，这里使用的是 koa-views
// 然后安装 npm install --save ejs

const Koa = require('koa');
const views = require('koa-views')
const path = require('path');
const app = new Koa();

// 加载模板引擎
app.use(views(path.join(__dirname, './'), {
  extension: 'ejs'
}))

app.use(async ctx => {
  const title = 'Hello koa2';
  await ctx.render('index', {
    title
  })
})

app.listen(3000, () => {
  console.log('run at 3000');
})
