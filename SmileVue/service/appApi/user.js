// 对 user 的所有数据库操作
const Router = require('koa-router');
const mongoose = require('mongoose');

const router = new Router();

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

// 登录
router.post('/login', async (ctx) => {
  const loginUser = ctx.request.body;
  console.log('loginBody', loginUser);
  const username = loginUser.username;
  const password = loginUser.password;
  // 引入 User 的 model
  const User = mongoose.model('User');
  await User.findOne({ username }).exec().then(async (result) => {
    console.log(result);
    if (result) {
      // console.log(User)
      // 当用户名存在时，开始比对密码
      const newUser = new User(); // 因为是实例方法，所以要new出对象，才能调用
      await newUser.comparePassword(password, result.password)
        .then((isMatch) => {
          // 返回比对结果
          ctx.body = { code: 200, message: isMatch };
        })
        .catch((error) => {
          // 出现异常，返回异常
          console.log(error);
          ctx.body = { code: 500, message: '用户名或密码错误' };
        });
    } else {
      ctx.body = { code: 200, message: '用户名不存在' };
    }
  }).catch((error) => {
    console.log(error);
    ctx.body = { code: 500, message: error };
  });
});


module.exports = router;
