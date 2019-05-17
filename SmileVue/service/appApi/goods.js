const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

const app = new Koa();
const router = new Router();

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('../json_data/goods.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    let savaCount = 0;
    const Goods = mongoose.model('Goods');
    data.map((value, index) => {
      const newGoods = new Goods(value);
      newGoods.save().then(() => {
        savaCount++;
        console.log(`成功${savaCount}`);
      }).catch((error) => {
        console.log(`失败: ${error}`);
      });
    });
  });
  ctx.body="开始导入数据"
});

module.exports = router;
