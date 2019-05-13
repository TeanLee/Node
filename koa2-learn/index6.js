// cookie
// 比如我们要存储用户名，保留用户登录状态时，你可以选择7天内不用登录，也可以选择30天内不用登录。这就需要在写入是配置一些选项：

// domain：写入cookie所在的域名
// path：写入cookie所在的路径
// maxAge：Cookie最大有效时长
// expires：cookie失效时间
// httpOnly:是否只用http请求中获得
// overwirte：是否允许重写
// ctx.cookies.get(name,[optins]) options 选项就是实现上面内容的
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  console.log('ctx.url: ', ctx.url);
  if(ctx.url === '/') {
    ctx.cookies.set(
      'myName', 'ltt', {
        domain:'127.0.0.1', // 写cookie所在的域名
        path:'/',       // 写cookie所在的路径
        maxAge:1000*60*60*24,   // cookie有效时长
        expires:new Date('2019-12-31'), // cookie失效时间
        httpOnly:false,  // 是否只用于http请求中获取
        overwrite:false  // 是否允许重写
      }
    )
    ctx.body = '<h1>Cookie is ok.</h1>'
  } else {
    // 读取cookie
    if( ctx.cookies.get('myName')){
      ctx.body = ctx.cookies.get('myName');
    }else{
      ctx.body = 'Cookie is none';
    }
  }
})

app.listen(3000, () => {
  console.log('run at 3000');
})
