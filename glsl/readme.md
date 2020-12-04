# GLSL语言

## 变量类型

1. vec4(四分量浮点向量)
2. vec2(二分量浮点向量)
3. vec3(三分量浮点向量)
4. float(单精度浮点型)
5. int(整型)
6. bool(布尔型)

## 宏指令

```glsl
#ifdef GL_ES
precision mediump float;
#endif
```

float类型非常重要，因为精度决定了渲染，更低的精度渲染速度非常快，但是以质量为代价。

上面代码设置了精度为中等，另外也可以设置低或高的精度

```glsl
precision lowp float;
precision highp float;
```

## Uniforms(统一值)

由于GPU并行处理线程，每个线程负责部分的配置，虽然线程之间不能有数据交换，不过可以给每个线程输入数据，因此所有线程的输入值必须要**统一**，而且必须设置为**只读**

其类型，主要有：

1. float
2. vec2
3. vec3
4. vec4
5. mat2
6. mat3
7. mat4
8. sampler2D
9. samplerCube

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution; // 画布尺寸
uniform vec2 u_mouse; // 鼠标位置
uniform float u_time; // 时间(s)
```

## gl_FragCoord

用来存储活动线程正在处理的**像素**或**屏幕碎片**的坐标。

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  gl_FragColor = vec4(st.x,st.y,0.0,1.0);
}
```

上述中使用`gl_FragCoord.xy`除以`u_resolution`，称之为**规范化**，这样将坐标值范围划为[0.0, 1.0]之间，用来做颜色值的映射。

## 内置函数

1. pow(x, y) x的y次幂
2. exp() 以e为底的指数函数
3. log() 对数函数
4. sqrt() 平方根函数
5. sin()
6. cos()
7. abs()
8. fract() 返回一个数的小数部分
9. ceil() 正无穷取整
10. floor() 负无穷取整
11. step(x, y) x为极限或阈值，y为要检测的值，如果y小于x，则返回0.0，否则返回1.0
12. smoothstep(x, y, z) 给出范围[x, y]之间z的插值
13. mod(x, y) 返回x对y的取模
14. sign() 提取一个数的正负号
15. clamp(x,0.0,0.1) 把x的值限制在[0.0,1.0]范围中
16. min(x,y) 返回x,y中的较小值
17. max(x,y) 返回x,y中的较大值
18. mix() 混合两个值，范围是[0.0,1.0]
