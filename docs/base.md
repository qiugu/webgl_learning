## 1. 获取WebGL上下文

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
