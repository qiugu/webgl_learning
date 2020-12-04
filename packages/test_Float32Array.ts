let arr0: Float32Array = new Float32Array(8);
console.log(arr0.buffer);
for (let i: number = 0; i < arr0.length; i++) {
    arr0[i] = i * 100.0;
}
for (let i: number = 0; i < arr0.length; i++) {
    console.log(arr0[i]);
}
console.log('arr1共享arr0中的ArrayBuffer的部分区块');
let arr1: Float32Array = new Float32Array(arr0.buffer, 4 * Float32Array.BYTES_PER_ELEMENT, 4);
for (let i: number = 0; i < arr1.length; i++) {
    console.log(arr1[i]);
}
console.log('重置arr1的各个元素为10.0的倍数');
for (let i: number = 0; i < arr1.length; i++) {
    arr1[i] = i * 10.0;
}
for (let i: number = 0; i < arr1.length; i++) {
    console.log(arr1[i]);
}
