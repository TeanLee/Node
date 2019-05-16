const mongoose = require('mongoose'); // 引入 mongoose

const Schema = mongoose.Schema; // 声明 Schema

const ObjectId = Schema.Types.ObjectId; // 声明 Object 类型

// 创建我们的客户Schema
const userSchema = new Schema({
  UserId: ObjectId,
  username: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() },
});

// 发布模型
mongoose.model('User', userSchema);
