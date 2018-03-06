const express = require('express');
const app = express();
// 一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const captchapng = require('captchapng');
// 中间件  所有数据都会经过中间件进行过滤
app.use(bodyParser.urlencoded({
    entended: false
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.set('view engine', 'ejs'); // 模板引擎  后台编译

// 自动生成图片的类
class VerificationCode {
    constructor(len = 4, w = 80,h = 30) {
      this.w = w;
      this.h = h;
      this.len = len;
      this.randomNumber = null;
    }
    getRandomNumber() {
      let i = 0,
        res = [];
      while(i < this.len) {
        i++;
        res.push(Math.floor(Math.random()*10));
      }
      return res.join('');
    }
    getImgBase64() {
      let cap;
      this.randomNumber = this.getRandomNumber();
      cap = new captchapng(this.w, this.h, this.randomNumber);
      cap.color(0,0,0,0);
      cap.color(80,80,80,255);
      let img = cap.getBase64(), imgbase64 = new Buffer(img, 'base64');
      return imgbase64;
    }
    // 显示的文字
    getJSON() {
      let imgbase64 = this.getImgBase64();
      return {
        number: this.randomNumber,
        base64: 'data:image/png;base64,' + imgbase64.toString('base64')
      }
    }
}

app.get('/api', function(req, res) {
    res.json({
        data: [{
            movie: "女儿国"
        },{
            movie: "唐人街探案"
        }]
    })
})

app.post('/login', function(req, res) {
    // 表单的数据？
    // 如何将表单的数据跟随机的数据进行比较
    // console.log(req.cookies);
    // console.log(req.body);
    if(req.cookies.yzm === req.body.code) {
        res.send('验证码输入正确');
    } else {
        res.send('验证码输入错误')
    }
})

app.get('/', function(req, res) {
    // req 请求  res 返回
    // 数据库查询 m
    // 业务处理 c
    // view v
    // 两个参数   第一个是前端输出   后一个是从后端获取的数据
    let code = new VerificationCode(),
      code_data = code.getJSON();
    // 种cookie
    res.cookie('yzm', code_data.number, { maxAge:60000 });

    res.render('index', {
        title: '图形验证码',
        pic: code_data.base64
    });
})
app.listen(3000);
  