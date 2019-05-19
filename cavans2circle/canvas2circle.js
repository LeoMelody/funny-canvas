/*
 * @Author: leo 
 * @Date: 2019-05-19 15:12:43 
 * @Last Modified by: leo
 * @Last Modified time: 2019-05-19 16:22:52
 * canvas to circle
 */

const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d');

let w = canvas.width = window.innerWidth
let h = canvas.height = window.innerHeight

// 先创建一个黑色的画布
function initCanvas() {
  context.fillStyle='#000';
  context.fillRect(0,0,w,h);
}

initCanvas()

// init data 创建一个小球数组
let balls = []

// 先绘制一个测试的区域
context.fillStyle='#E0FFFF'; // 随便找的一个颜色
context.fillRect(100, 100, 100, 100);

/**
 * 将指定区域的canvas内容图案变成小球
 * @param {*} radius 转换为circle的小球半径
 */
function canvas2circle(radius = 1) {
  // 获取imgData以及其内部数据 getImageData 的区域 width * height 应该是4的倍数
  const imgData = context.getImageData(100, 100, 100, 100);
  const {data, width, height} = imgData
  // cicle所占用的单位像素，即长或者宽
  let unitPix = radius * 2
  // 遍历高度
  for (let i = radius; i <= height - unitPix + radius; i += unitPix) {
    // 遍历长度
    for (let j = radius; j <= width - unitPix + radius; j += unitPix) {
      // 我们这里暂时先以当前这个点的color值来作为标准，后面有能力/想法 会引入一些好一些的算法
      // 找出四个点
      const point1Index = ((i-1)*height + j - 1)*4
      const point2Index = ((j-1)*width + i)*4
      const point3Index = (j*width + i - 1)*4
      const point4Index = (j*width + i)*4
      // 计算这四个点的平均color值
      const bg = `rgba(${(data[point1Index] + data[point2Index] + data[point3Index] + data[point4Index])/4}, ${(data[point1Index + 1] + data[point2Index + 1] + data[point3Index + 1] + data[point4Index + 1])/4}, ${(data[point1Index + 2] + data[point2Index + 2] + data[point3Index + 2] + data[point4Index + 2])/4}, ${(data[point1Index + 3] + data[point2Index + 3] + data[point3Index + 3] + data[point4Index + 3])/4})`
      createBall(i, j, radius, bg)
    }
  }
}

class Ball {
  constructor(x, y, radius, bg) {
    this.x = x
    this.y = y
    this.radius = radius
    this.bg = bg
  }

  draw() {
    context.beginPath();
    context.arc(100 + this.x, 100 + this.y, this.radius, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
    context.fillStyle=this.bg;
    context.fill();
  }
}

function createBall(x, y, radius, bg) {
  balls.push(new Ball(x, y, radius, bg))
}

function render() {
  // test code
  for(let ball of balls) {
    ball.draw()
  }
}

function start() {
  canvas2circle(50)
  setTimeout(() => {
    initCanvas()
    render()
  }, 1000)
}

start()