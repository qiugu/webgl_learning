import Camera from "./lib/Camera";
import WebGLApplication from "./webgl/WebGLApplication";

export default class CameraApplication extends WebGLApplication {
    public camera: Camera;

    public constructor(
        canvas: HTMLCanvasElement,
        // getContext方法的选项属性
        // premultipliedAlpha表明排版引擎讲假设绘制缓冲区包含预混合alpha通道的boolean值
        contextAttibutes: WebGLContextAttributes = { premultipliedAlpha: false },
        need2D: boolean = false
    ) {
        super(canvas, contextAttibutes, need2D);
        this.camera  = new Camera(canvas.width, canvas.height, 45, 1, 2000);
    }
}
