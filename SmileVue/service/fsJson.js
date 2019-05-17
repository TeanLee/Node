// node的fs模块，可以轻松把文件读取到程序中，然后进行遍历，把有用的数据提取出来，写入到一个新的数组中
const fs = require('fs');

fs.readFile('./json_data/goods.json', 'utf8', (err, data) => {
  let newData = JSON.parse(data);
  let i = 0;
  let pushData = [];
  newData.RECORDS.map((value, index) => {
    if (value.IMAGE1!=null) {
      i++;
      pushData.push(value);
    }
  });
  fs.unlink('./json_data/newGoods.json')
  fs.writeFile('./json_data/newGoods.json', JSON.stringify(pushData), err => {
    if (err) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  });
});
