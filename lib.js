
/**
 * 绘制抛物线
 * @param {*} x0 
 * @param {*} y0 
 * @param {*} p 
 * @param {*} min 
 * @param {*} max 
 */
const LINE_SEGMENTS = 60;
export function parabola(x0, y0, p, min, max) {
  const ret = [];
  for (let i = 0; i < LINE_SEGMENTS; i++) {
    const s = i / 60;
    const t = min * (1 - s) + max * s;
    const x = x0 + 2 * p * t ** 2;
    const y = y0 + 2 * p * t;
    ret.push(x, y);
  }
  return new Float32Array(ret);
}

/**
 * 绘制圆
 * @param {number} x0 圆心x坐标
 * @param {number} y0 圆心y坐标
 * @param {number} radius 圆的半径
 * @param {number} startAng 圆的起始角度
 * @param {number} endAng 圆的结束角度
 */
const TAU_SEGMENTS = 100; // 整圆的线段数
const TAU = Math.PI * 2;
export function arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
  const ang = Math.min(TAU, endAng - startAng);
  const ret = ang === TAU ? [] : [x0, y0];
  // 获取当前角度的线段数：整圆的线段数 * (当前弧度 / 整圆弧度)的比值
  const segments = Math.round(TAU_SEGMENTS * ang / TAU);
  for (let i = 0; i < segments; i++) {
    /**
     * 根据圆的参数方程得到
     * x = x0 + r * cos()
     * y = y0 + r * sin()
     */
    const x = x0 + radius * Math.cos(startAng + ang * i / segments);
    const y = y0 + radius * Math.sin(startAng + ang * i / segments);
    ret.push(x, y);
  }
  return new Float32Array(ret);
}

/**
 * 创建正多边形
 * @param {number} edges 图形的边数
 * @param {number} x 图形的起始点x坐标
 * @param {number} y 图形的起始点y坐标
 * @param {number}step 图形的边长
**/
export function regularShape(edges = 3, x, y, step) {
  const ret = [];
  const delta = Math.PI * (1 - (edges - 2) / edges);
  let p = new Vector2D(x, y);
  const dir = new Vector2D(step, 0);
  ret.push(p.x, p.y);
  for (let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta));
    ret.push(p.x, p.y);
  }
  return new Float32Array(ret);
}

export function draw(dom, points) {
  // 1. 获取webgl上下文
  const canvas = document.querySelector(dom);
  const gl = canvas.getContext('webgl');

  // 2. 创建着色器
  const vertex = `
    attribute vec2 position;
    varying vec3 color;

    void main () {
      gl_PointSize = 1.0;
      color = vec3(0.5 + position * 0.5, 0.0);
      gl_Position = vec4(position * 0.5, 1.0, 1.0);
    }
  `;

  const fragment = `
    precision mediump float;
    varying vec3 color;

    void main () {
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // 3. 创建shader对象
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);

  // 4. 创建program对象
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  // 5. 将数据存入缓冲区
  

  // 6. 将定义好的数据写入webgl
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  // 7. 读取缓冲区的数据到GPU
  const vPosition = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  // 8. 执行着色器程序完成绘制
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.LINES, 0, points.length / 2);
}

export default class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    super(x, y);
  }

  set x(v) {
    this[0] = v;
  }

  set y(v) {
    this[1] = v;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get length() {
    // 返回第一、第二个参数平方和的平方根
    return Math.hypot(this.x, this.y);
  }

  get dir() {
    // 返回从原点(0,0)到(x,y)点的线段与x轴正方向之间的平面角度(弧度值)，也就是Math.atan2(y,x)
    return Math.atan2(this.y, this.x);
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(a) {
    this.x *= a;
    this.y *= a;
    return this;
  }

  cross(v) {
    return this.x * v.y - v.x * this.y;
  }

  dot(v) {
    return this.x * v.x + v.y * this.y;
  }

  normalize() {
    return this.scale(1 / this.length);
  }

  rotate(rad) {
    const c = Math.cos(rad),
      s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
}
