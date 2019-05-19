/*
 * @Author: leo 
 * @Date: 2019-05-08 00:04:39 
 * @Last Modified by: leo
 * @Last Modified time: 2019-05-10 00:26:57
 */

 // 第一步，绘制小球
const canvas = document.querySelector('#canvas')
let ww = window.innerWidth
let wh = window.innerHeight
canvas.width = ww
canvas.height = wh
const context = canvas.getContext('2d')
let ballArrs = []
const colorArrs = [
  '#14B2A1',
  '#FECEA8',
  '#FF847C',
  '#FF847C',
  '#FF847C',
  '#FA7878',
  '#D6B78A',
  '#BF1765'
]
const random = Math.random

let mouseX = null, mouseY = null

// 定义ball
class Ball {
  constructor() {
    // init x y radius color bg speed 
    this.radius = random()*5 + 1 // 1~11 大小
    this.tmpRadius = this.radius
    /*
    这个计算的含义可以通过最大最小值来算出来
    拿x举例， x最小为 this.radius 此时random() 无限接近0 所以，必须有个this.radius 作为基准项
    x最大为ww-this.radius random() 无限接近1 所以是 this.radius + x = ww-this.radius x = ww - 2*this.radius
    y同理
    */
    this.x = this.radius + random()*(ww-2*this.radius)
    this.y = this.radius + random()*(wh-2*this.radius)
    this.color = `rgb(${random()*255}, ${random()*255}, ${random()*255})` 
    this.speedx = random()*1-0.5// -1~1
    this.speedy = random()*1-0.5 // -1~1
    this.bg = colorArrs[Math.floor(Math.random() * colorArrs.length)]
  }

  move() {
    if (this.x+this.speedx > ww-this.radius || this.x+this.speedx < this.radius) {
      this.speedx = -this.speedx
    }
    if (this.y+this.speedy > wh-this.radius || this.y+this.speedy < this.radius) {
      this.speedy = -this.speedy
    }
    this.x+=this.speedx
    this.y+=this.speedy
    let dis = computedDIS(this.x, this.y, mouseX, mouseY)
    if (dis && dis < 50) {
      this.increase()
    } else {
      this.decrease()
    }
    context.beginPath();
    context.arc(this.x, this.y, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    // context.strokeStyle=this.color;
    // context.stroke();
    // let gradient = context.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, 0);
    // gradient.addColorStop(0, this.bg);
    // gradient.addColorStop(1, '#fff')
    context.fillStyle = this.bg
    context.fill();
  }

  increase() {
    if (this.radius > 50) return
    this.radius += 1
  }

  decrease() {
    if (this.radius <= this.tmpRadius) {
      this.radius = this.tmpRadius
      return
    }
    this.radius -= 1
  }
}

function create() {
  ballArrs = []
  let sum = 400
  while(sum > 0) {
    sum--
    ballArrs.push(new Ball())
  }
}
  
function animate() {
  context.clearRect(0, 0, ww, wh);
  for(let item of ballArrs) {
    item.move()
  }
  requestAnimationFrame(animate)
}

/**
 * 计算两点距离
 */
function computedDIS(x1, y1, x2, y2) {
  if (!x1 || !x2 || !y1 || !y2) return 
  let dx = Math.abs(x1 - x2) 
  let dy = Math.abs(y1 - y2)
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
} 

;(function() {
  // 监听鼠标变化
  document.body.addEventListener('mousemove', function(e) {
    mouseX = e.x
    mouseY = e.y
  })

  window.addEventListener('resize', function() {
    ww = window.innerWidth
    wh = window.innerHeight
    canvas.width = ww
    canvas.height = wh
    create()
  })
})(document, window)

create()
animate()