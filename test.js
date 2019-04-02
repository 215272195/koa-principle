
// 这个文件可以直接执行 node test.js
// 1 2 3 函数依次执行 洋葱圈先进后出
async function fn1(next){
  console.log('fn1')
  await next()
  console.log('end fn1')
}

async function fn2(next){
  console.log('fn2')
  await delay()
  await next()
  console.log('end fn2')
}
function fn3(next){
  console.log('fn3')
}

function delay(){
  return new Promise((reslove,reject)=>{
    setTimeout(()=>{
      reslove()
    },2000)
  })
}

function compose (middlewares){
  return function(){
    // dispatch控制所有的逻辑 首先执行第0个
    return dispatch(0)
    function dispatch(i){
      // fn只需要把所有的函数都执行一遍就好了
      let fn = middlewares[i]
      if(!fn){
        return Promise.resolve()
      }
      // 立即执行的Promise
      return Promise.resolve(fn(function next(){
        return dispatch(i+1)
      }))
    }
  }
}

// 三个函数组成的中间件
const middlewares = [fn1,fn2,fn3]
const finalFn = compose(middlewares)
finalFn()





// function add(x,y){
//   return x+y
// }
// function double(z){
//   return z*2
// }
// const res1 = add(1,2)
// const res2 = double(res1)
// console.log(res2)

// const res3 = double(add(1,2))
// console.log(res3)
// const middlewares = [add, double]
// let len = middlewares.length
// function compose(midds){
//   return (...args)=>{
//     // 初始值
//     let res = midds[0](...args)
//     for(let i=1;i<len;i++){
//       res = midds[i](res)
//     }
//     return res
//   }
// }
// const fn = compose(middlewares)
// const res = fn(1,2)
// console.log(res)



// let woniu = {
//   _name:'蜗牛',
//   get name(){
//     return this._name
//   },
//   set name(val){
//     console.log('new name is '+val)
//     this._name = val
//   }
// }
// console.log(woniu.name)
// woniu.name = 'imooc'
// console.log(woniu.name)