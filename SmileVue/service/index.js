const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
// 在操作数据库前先引入我们的Mongoose和我们刚写好的initSchemas
const mongoose = require('mongoose');
const { connect, initSchemas } = require('./database/init.js');

;(async () => {
  await connect();
  initSchemas();
  const User = mongoose.model('User');
  const oneUser = new User({ userName: 'ltt', password: '123456' });
  oneUser.save().then(() => {
    console.log('插入成功');
  });
  const users = await User.findOne({}).exec();
  console.log('------------------');
  console.log(users);
  console.log('------------------');
})();


// app.use(async (ctx) => {
//   ctx.body = '<h1>hello Koa2</h1>';
// });

app.listen(3000, () => {
  console.log('[Server] starting at port 3000');
});

// 路由加载

// 引入 user 模块
const user = require('./appApi/user.js');

const router = new Router();
router.use('/user', user.routes());
app.use(router.routes()).use(router.allowedMethods());
