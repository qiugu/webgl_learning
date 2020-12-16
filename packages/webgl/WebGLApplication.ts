import { Application } from "../Application";
import GLMeshBuilder from "./GLMeshBuilder";
import GLWorldMatrixStack from "./GLWorldMatrixStack";

export default class WebGLApplication extends Application {
    public gl: WebGLRenderingContext;
    public matStack: GLWorldMatrixStack;
    public builder: GLMeshBuilder;
    protected canvas2D: HTMLCanvasElement | null = null;
    protected ctx2D: CanvasRenderingContext2D | null = null;

    public constructor(
        canvas: HTMLCanvasElement,
        contextAttributes: WebGLContextAttributes = { premultipliedAlpha: false },
        need2D: boolean = false
    ) {
        super(canvas);
        let ctx: WebGLRenderingContext | null = this.canvas.getContext('webgl', contextAttributes);
        if (ctx === null) {
            throw new Error('Unable to create WebGLRenderingContext context object');
        }

        this.gl = ctx;
        if (need2D) {
            let canvasElem: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
            canvasElem.width = this.canvas.width;
            canvasElem.height = this.canvas.height;
            canvasElem.style.backgroundColor = 'transparent';
            canvasElem.style.position = 'absolute';
            canvasElem.style.top = '0px';
            canvasElem.style.left = '0px';
        }
    }
}
