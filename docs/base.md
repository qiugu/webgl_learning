# WebGL基础

## 1. 获取WebGL上下文

其实就是创建WebGLRenderingContext对象

```Javascript
const gl = canvas.getContext('webgl', options);
```

这里的`options`就是`WebGLContextAttributes`类型，包含下面几个属性

1. depth 创建深度缓冲区，默认值为true
2. stencil 创建模板缓冲区，默认值为false
3. alpha 设置颜色缓冲区的格式，true表示格式为rgba，false则为rgb，默认值为false
4. premultipiedAlpha 不使用预乘alpha，默认为true，暂时不会用到这个值
5. antialias 设置抗锯齿，硬件支持的话就会使用抗锯齿功能，默认为true
6. preserveDrawingBuffer 保留上一帧的渲染，默认值为false，即不保留

WebGL清空缓冲区，包括三种缓冲区

1. 颜色缓冲区
2. 深度缓冲区
3. 模板缓冲区

执行操作的API

```JavaScript
gl.clear(buffer);

/*
 * buffer参数可以选择下面三种之一
 * gl.COLOR_BUFFER_BIT
 * gl.DEPTH_BUFFER_BIT
 * gl.STENCIL_BUFFER_BIT
 */
```

## 2. 初始化着色器

着色器包含两类

1. 顶点着色器
2. 片元着色器

顶点着色器控制点的位置和大小，片元着色器控制点的颜色

涉及到了两个类WebGLShader类和WebGLProgram类

首先来看看创建WebGLShader

### 创建shader对象

```JavaScript
const shader = gl.createShader(type);
/**
 *  type的类型可以下面两种
 *  1. gl.VERTEX_SHADER 顶点着色器类型
 *  2. gl.FRAGMENT_SHADER 片元着色器类型
 */
```

这里type就是上面说到的两类着色器，顶点和片元着色器。它们包含在WebGLRenderingContext的属性中，实际打印出来会发现就是number类型。

### 载入shader的源码

这里的源码就是一段GLSL编写的字符串，后面会详细去解释这个语言，现在只需要知道他是一个类C的语言，如下所示的代码片段就是着色器的GLSL的代码：

```c
// 顶点着色器
// 声明了一个变量，这个变量需要从外部传入进来
attribute vec4 a_Position;

void main() {
    // gl_Position是glsl内置的变量，表示所画对象的位置坐标信息
    gl_Position = a_Position;
}
```

```c
void main() {
    // gl_FragColor是一个内置变量，表示对象的像素信息
    // 这里vec4表示一个颜色的向量，每个分量分别表示rgba四个值，颜色范围取值在[0.0, 1.0]之间
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

那就来执行载入源码：

```JavaScript
gl.shaderSource(shader, source);
```

### 编译源码

熟悉C语言应该都比较了解，运行代码时需要先进行编译操作，这里也是将载入着色器中的代码进行编译

```JavaScript
gl.compileShader(shader);
```

编译完成以后，可以去判断是否编译成功了：

```JavaScript
// 返回一个布尔值，成功的话为true，否则为false
const isSuccess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
```
