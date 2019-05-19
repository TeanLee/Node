const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

const app = new Koa();
const router = new Router();

// 批量插入商品详情数据到MongoDB中
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
  ctx.body = '开始导入数据';
});

// 商品大类的Shema建立和导入数据库
router.get('insertAllCategory', async (ctx) => {
  fs.readFile('../json_data/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Category = mongoose.model('Category');
    data.RECORDS.each((value, index) => {
      const newCategory = new Category(value);
      newCategory.save().then(() => {
        saveCount++;
      }).catch((error)=>{
        console.log(`失败${error}`);
      });
    });
  });
  ctx.body = '开始导入数据';
});

// 商品子类的Shema建立和导入数据库
router.get('/insertAllCategorySub',async(ctx)=>{
  fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
    data = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = mongoose.model('CategorySub');
    data.RECORDS.each((value, index) => {
      console.log(value);
      let newCategorySub = new CategorySub(value);
      newCategorySub.save().then(() => {
        saveCount++;
        console.log(`成功插入${saveCount}`);
      }).catch(error=>{
        console.log(`插入失败:${error}`);
      });
    });
  });
  ctx.body = '开始导入数据';
});

module.exports = router;
