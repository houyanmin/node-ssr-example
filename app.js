var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router')

//公开目录
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

// .art文件使用art-template模板
app.engine('html',require('express-art-template'))

app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use(router)

//修改默认views视图目录
app.set('views','./views')


app.listen('5758',function(){
    console.log('server run at port 5758')
})