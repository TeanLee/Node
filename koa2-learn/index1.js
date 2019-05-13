// 编写代码接收并解析POST请求，这样最基本的功能其实是不用我们自己写的，一定有造好的轮子让我们使用，koa-bodyparser就是一个造好的轮子。我们在koa中把这种轮子就叫做中间件。对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中。
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());

app.use(async ctx => {
  const { url, method } = ctx;
  if (url === '/' && method === 'GET') {
    // 显示表单页面
    let html=`
        <h1>JSPang Koa2 request POST</h1>
        <form method="POST" action="/">
            <p>userName</p>
            <input name="userName" /><br/>
            <p>age</p>
            <input name="age" /><br/>
            <p>website</p>
            <input name="webSite" /><br/>
            <button type="submit">submit</button>
        </form>
    `;
    ctx.body=html;
  } else if (url === '/' && method === 'POST') {
    let postBody = ctx.request.body;
    ctx.body = postBody;
  } else {
    ctx.body = '<h1>404</h1>'
  }
})

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
})
