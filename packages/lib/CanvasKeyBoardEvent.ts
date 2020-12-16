import { CanvasInputEvent, EInputEventType } from "./CanvasInputEvent";

export default class CanvasKeyBoardEvent extends CanvasInputEvent {
    // 按键的字符
    public key: string;
    // 按键的ascii码
    public keyCode: number;
    // 当前按下的键是否不停的触发事件
    public repeat: boolean;

    public constructor(
        type: EInputEventType,
        key: string,
        keyCode: number,
        repeat: boolean,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean
    ) {
        super(type, altKey, ctrlKey, shiftKey);
        this.key = key;
        this.keyCode = keyCode;
        this.repeat = repeat;
    }
}