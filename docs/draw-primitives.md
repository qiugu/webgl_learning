## 绘制三角形

### 如何传递缓冲数据

1. 创建缓冲区对象
2. 绑定缓冲区对象
3. 将数据写入缓冲区对象
4. 将缓冲区对象分配给一个attribute变量
5. 开启attribute变量

### 绑定缓冲区对象

```js
gl.bindBuffer(target, buffer);
```
target可以是以下两个中的一个
- gl.ARRAY_BUFFER 表示缓冲区中的对象包含顶点数据
- gl.ELEMENT_ARRAY_BUFFER 表示缓冲区对象包含了顶点的索引值

### 向缓冲区对象写入数据

```gl
gl.bufferData(target, data, usage);
```

target就是上面所说的两种，data即是要绑定的数据，而usage表示程序如何使用存储在缓冲区对象中的数据，可以帮助WebGL优化操作，可以是下面几种类型之一：

- gl.STATIC_DRAW 表示只会向缓冲区对象中写入一次数据，但需要绘制多次
- gl.STREAM_DRAW 表示只会向缓冲区对象中写入一次数据，然后绘制若干次
- gl.DYNAMIC_DRAW 表示会向缓冲区对象中多次写入数据，并绘制很多次

### 类型化数组
