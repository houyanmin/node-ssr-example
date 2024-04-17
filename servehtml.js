var url = require('url');
var http = require('http');
var os = require('os');
var fs = require('fs');
let path = require("path");

var server = http.createServer();
var networkInterfaces = os.networkInterfaces();
 
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
            pathName = "./dist/index.html";
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

function getLocalIP() {
    for (const iface of Object.values(networkInterfaces)) {
      for (const config of iface) {
        if (config.family === 'IPv4' && !config.internal) {
          return config.address;
        }
      }
    }
    return '127.0.0.1'; // 如果没有找到，返回本地回环地址
}

server.listen(5758, function() {
    console.log("服务已启动:",'\x1b[32m',`http://${getLocalIP()}:5758`);
})