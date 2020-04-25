import {info} from './test'
console.log(info)

function test (name='cc') {
  console.log(name)
}

if(navigator.serviceWorker) {
  window.addEventListener('DOMContentLoaded',()=> {
    navigator.serviceWorker.register('../sw.js')
  })
}

test()