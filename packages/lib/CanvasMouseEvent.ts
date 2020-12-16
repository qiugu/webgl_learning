import vec2 from "../math/vec2";
import { CanvasInputEvent, EInputEventType } from "./CanvasInputEvent";

export default class CanvasMouseEvent extends CanvasInputEvent {
    // 表示按下鼠标哪个键，0: 左键，1：中键，2：右键
    public button: number;
    // canvas坐标系
    public canvasPosition: vec2;

    public constructor(
        type: EInputEventType, 
        canvasPos: vec2,
        button: number,
        altKey: boolean = false,
        ctrlKey: boolean = false,
        shiftKey: boolean = false
    ) {
        super(type, altKey, ctrlKey, shiftKey);
        this.canvasPosition = canvasPos;
        this.button = button;
        console.log(this.button);
    }
}
