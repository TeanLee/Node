const mongoose = require('mongoose');

const db = 'mongodb://localhost/simle-db';

mongoose.Promise = global.Promise;

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db);

  // 失败重连次数。如果超过三次重连失败，就抛出异常
  let maxConnectTimes = 0;

  // 在 init 时，必须确保先连接数据库后，再做其他事情，所以我们需要在所有代码的外面加一层 Promise
  return new Promise((resolve, reject) => {
    // 增加数据库连接的事件监听
    mongoose.connection.on('disconnected', () => {
      console.log('***********数据库断开***********');
      // 进行重连
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    });

    // 数据库出现错误的时候
    mongoose.connection.on('error', (err) => {
      console.log('***********数据库错误***********');
      console.log(err);
      mongoose.connect(db);
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        // 重连
        mongoose.connect(db);
      } else {
        reject(err);
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    });

    // 链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!');
      resolve();
    });
  });
};
