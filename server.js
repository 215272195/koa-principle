const Woa = require('./application')
const app = new Woa()
function delay(){
  return new Promise((reslove,reject)=>{
    setTimeout(()=>{
      reslove()
    },2000)
  })
}

app.use(async (ctx,next)=>{
  ctx.body = '1'
  await next()
  ctx.body += '2'
})
app.use(async (ctx,next)=>{
  ctx.body += '3'
  await delay()
  await next()
  ctx.body += '4'
})
app.use(async (ctx,next)=>{
  ctx.body += '5'
})
// 使用浅层封装
// app.use((req, res)=>{
//   res.writeHead(200)
//   res.end('hello imooc')
// })
app.listen(9092,()=>{
  console.log('server runing on port 9092')
})













// 最简单的http服务
// const http = require('http')

/** 
 * @Params1 请求
 * @Params2 响应
 * **/
// const server = http.createServer((req, res)=>{
    // 状态码
//   res.writeHead(200)
//   res.end('hello imooc')
// })

// 新建端口
// server.listen(9092,()=>{
//   console.log('server start on port 9092')
// })