var url = require('url');
var http = require('http');
var server = http.createServer();

var fs = require('fs');
// 引入 path 模块
let path = require("path");

var data = [{
    name: '1',
    content: '2'
}];

// 获取后缀名
getExt = (extName) => {
    // readFile 是异步操作，所以需要使用 readFileSync
    let data = fs.readFileSync('./ext.json');
    let ext = JSON.parse(data.toString());
    return ext[extName];
}


//响应客户端
server.on('request', function(req, res) {
    // write可以多次，end作为结尾
    // res.write();
    // res.end();

    // 客户端端口
    // res.socket.remotePort
    // 设置响应头
    // res.setHeader('Content-Type','text/plain; charset=utf-8');




    if (req.url != "/favicon.ico") {

        // 获取响应路径
        let pathName = url.parse(req.url).pathname;

        // 默认加载路径
        if (pathName == "/") {
            // 默认加载的首页
            pathName = "./views/index.html";
        } else if (pathName == "/data") {
            // 默认加载的首页
            pathName = "./views/index.html";
            var obj = url.parse(req.url, true);
            obj.query.name && obj.query.content && data.push({ name: obj.query.name, content: obj.query.content });
            console.log(JSON.stringify(data));
        } else if (pathName == "/views/other.html") {
            // 读取写入文件
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.write(JSON.stringify(data));
            // 结束响应
            res.end();
            return;
        }



        // 获取文件的后缀名
        let extName = path.extname(pathName);
        fs.readFile('./' + pathName, (err, data) => {
            if (err) {
                res.write(JSON.stringify(err));
                res.end();
                return;
            } else {
                // 获取文件类型
                let ext = getExt(extName);
                // 设置请求头
                res.writeHead(200, {
                    "Content-Type": ext + "; charset='utf-8'"
                });
                // 读取写入文件
                res.write(data);
                // 结束响应
                res.end();
            }
        })

    }
})

server.listen(5758, function() {
    console.log("服务已启动");
})