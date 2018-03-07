// node 的核心模块
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// 接口交给config
const config = require("./config");
const mime = require('mime');
const handlebars = require('handlebars');

// 创建一个服务器
const server = http.createServer();
server.on('request', request.bind(this));

function request (req, res) {
    const { pathname } = url.parse(req.url);
    // 根据路径得到链接
    let filepath = path.join(config.root, pathname);
    if (pathname === '/') {
        const rootPath = path.join(config.root, 'index.html');
        console.log(rootPath);
        // 设置返回的状态码作为头部
        // 文件类型   text/html   png    text/css   后端叫做minme
        // mime.getType 会获得文件的类型
        // header 是http 响应头  状态码， 响应体
        console.log(mime.getType(rootPath));
        res.setHeader('Content-Type', mime.getType(rootPath) + ';charset=utf-8');
        // 打开读 流   发送给res   发送之后   首页html文件才能在该路径下渲染出来
        return fs.createReadStream(rootPath).pipe(res);
    }

    // 文件或目录   fs.stat获取文件信息  包含了一个文件该有的信息
    // 打开文件系统   一个接口处理
    fs.stat(filepath, (err,stats) => {
        if (err) {
            res.end('not found');
            return ;
        }
        // stats.isDrectory() 判断文件是不是目录
        if (stats.isDirectory()) {
            console.log('目录');
            // 得到所有文件
            // 阻塞 异步  无阻塞 node 
            let files = fs.readdirSync(filepath);
            files = files.map(file => ({
              name: file,
              url: path.join(pathname, file)
            }));
            // list 函数返回compile 之后的模板
            let html  = list()({
              title: pathname,
              files
            })      


            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            // console.log(files);
        } else {
            res.setHeader('Content-Type', mime.getType(filepath) + ';charset=utf-8');
            fs.createReadStream(filepath).pipe(res);
        }      
    })

    
    function list() {
        let tmpl = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'), 'utf8');
        return handlebars.compile(tmpl);
    }
    // const = url.parse(req.url)
    // /  =>  index.html
    // 识别出 /  path
    // http://localhost:3000/a/index.html?q=1
    // /images/a.png 
    // /template/*.html    
}

server.listen(config.port, () => {
    console.log(`静态文件服务启动成功，访问localhost:3000`);
})