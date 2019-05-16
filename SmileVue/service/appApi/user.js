// 对 user 的所有数据库操作
const Router = require('koa-router');
const mongoose = require('mongoose');

let router = new Router();

router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页';
});

router.get('/register', async (ctx) => {
  ctx.body = '用户注册接口';
});

router.post('/register', async (ctx) => {
  // 取得 Model
  const User = mongoose.model('User');
  // 把从前端获取的数据封装成一个新的 User 对象
  const newUser = new User(ctx.request.body);
  // 使用 mongoose 的方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功',
    };
  }).catch((error) => {
    ctx.body = {
      code: 500,
      message: error,
    };
  });
});

module.exports = router;
