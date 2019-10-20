//创造promise实例
const promise = new Promise(function(resolve, reject) {
   //Promise构造函数接受一个函数作为参数，该函数接收两个参数
   //这两个参数由JS引擎提供，无需自己部署 
   if(/* 异步操作成功 */) {
     resolve(value);
   }
   else {
     reject(error);
   }
})

//then方法接受两个回调函数作为参数
promise.then(function(value) {
  //第一个回调函数在对象状态变为resolved时调用
}, function(error) {
  //第二个回调函数在对象状态变为rejected时调用
  //可选参数
})

promise
  .then(function(data) {

})
  .catch(function(err) {
    
  })