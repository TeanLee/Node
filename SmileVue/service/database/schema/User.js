const mongoose = require('mongoose'); // 引入 mongoose

const Schema = mongoose.Schema; // 声明 Schema

const ObjectId = Schema.Types.ObjectId; // 声明 Object 类型

// 加密处理。对存入数据库的密码，进行加密
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

// 创建我们的客户Schema
const userSchema = new Schema({
  UserId: ObjectId,
  username: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() },
});

// 每次数据存储前都要执行加盐加密的处理
userSchema.pre('save', (next) => {
  // 加盐处理：有了加密的处理，数据变得安全多了，但是有用户的密码设置的过于简单很好处理，因此进行加盐处理。
  // 就是在原来的密码里加入一些其他字符串，并且我们自己可以设置加入字符串的强度
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error);
      this.password = hash;
      next();
    });
  });
});

userSchema.methods = {
  // 密码对比方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        reject();
      });
    });
  },
};

// 发布模型
mongoose.model('User', userSchema);
