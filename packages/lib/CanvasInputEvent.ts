export enum EInputEventType {
    MOUSEEVENT,
    MOUSEDOWN,
    MOUSEUP,
    MOUSEMOVE,
    MOUSEDRAG,
    KEYBOARDEVENT,
    KEYUP,
    KEYDOWN,
    KEYPRESS
}

export class CanvasInputEvent {
    public altKey: boolean;
    public shiftKey: boolean;
    public ctrlKey: boolean;

    public type: EInputEventType;

    public constructor(
        type: EInputEventType = EInputEventType.MOUSEEVENT,
        altKey: boolean = false,
        ctrlKey: boolean = false,
        shiftKey: boolean = false
    ) {
        this.altKey = altKey;
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.type = type;
    }
}
