/*
 * @Author: leo 
 * @Date: 2019-05-11 09:28:14 
 * @Last Modified by: leo
 * @Last Modified time: 2019-05-11 13:44:17
 * canvas配合Html的用法
 */
// init canvas&data
let ww = window.innerWidth
let wh = window.innerHeight
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d');

let mx = null
let my = null

class Ball {
  constructor(x, y, radius, color) {
    
  }
}

;(function() {
  window.addEventListener('mousemove', function(e) {
    mx = e.x
    my = e.y
  })

  window.addEventListener('resize', function(e) {
    ww = window.innerWidth
    wh = window.innerHeight
    init()
  })
})(window, document)

function init() {
  canvas.width = ww
  canvas.height = wh
  animate()
}

function animate() {
  let text = 'my canvas point'
  context.clearRect(0, 0, ww, wh);
  context.beginPath();
  context.strokeText(text, mx, my);
  context.strokeStyle='red';
  context.stroke();  
  requestAnimationFrame(animate)
}

init()