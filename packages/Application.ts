import { EInputEventType } from "./lib/CanvasInputEvent";
import CanvasKeyBoardEvent from "./lib/CanvasKeyBoardEvent";
import CanvasMouseEvent from "./lib/CanvasMouseEvent";
import vec2 from "./math/vec2";

export type TimerCallback = (id: number, data: any) => void;

class Timer {
    public id: number = -1;
    // 标记当前计时器是否有效
    public enabled: boolean = false;

    // 计时器的回调函数
    public callback: TimerCallback;
    // 回调函数的参数
    public callbackData: any = undefined;

    // 倒计时器，update时会倒计时
    public countdown: number = 0;
    public timeout: number = 0;
    public onlyOnce: boolean = false;

    constructor(callback: TimerCallback) {
        this.callback = callback;
    }
}
/**
 *
 *
 * @export
 * @class Application
 */
export class Application implements EventListenerObject {
    public timers: Timer[] = [];
    private _timeId: number = -1;
    private _fps: number = 0;
    public isFlipYCoord: boolean = false;
    public canvas: HTMLCanvasElement;
    public isSupportMouseMove: boolean;
    protected _isMounseDown: boolean;
    protected _isRightMouseDown: boolean = false;
    protected _start: boolean = false;
    protected _requestId: number = -1;
    protected _lastTime!: number;
    protected _startTime!: number;

    public frameCallback: ((app: Application) => void) | null;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this._isMounseDown = false;
        this.isSupportMouseMove = false;
        this.frameCallback = null;
        document.oncontextmenu = function() { return false; }

        // canvas元素可以监听鼠标事件，但是无法监听键盘事件，因此在全局window上监听键盘事件
        this.canvas.addEventListener('mousedown', this, false);
        this.canvas.addEventListener('mousemove', this, false);
        this.canvas.addEventListener('mouseup', this, false);

        window.addEventListener('keydown', this, false);
        window.addEventListener('keyup', this, false);
        window.addEventListener('keypress', this, false);
    }

    public handleEvent(evt: Event): void {
        switch(evt.type) {
            case 'mousedown':
                this._isMounseDown = true;
                this.dispatchMouseDown(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDOWN));
                break;
            case 'mouseup':
                this._isMounseDown = false;
                this.dispatchMouseUp(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEUP));
                break;
            case 'mousemove':
                if (this.isSupportMouseMove) {
                    this.dispatchMouseMove(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEMOVE));
                }
                if (this._isMounseDown) {
                    this.dispatchMouseDrag(this._toCanvasMouseEvent(evt, EInputEventType.MOUSEDRAG));
                }
                break;
            case 'keypress':
                this.dispatchKeyPress(this._toCanvasMouseEvent(evt, EInputEventType.KEYPRESS));
                break;
            case 'keydown':
                this.dispatchKeyDown(this._toCanvasMouseEvent(evt, EInputEventType.KEYDOWN));
                break;
            case 'keyup':
                this.dispatchKeyUp(this._toCanvasMouseEvent(evt, EInputEventType.KEYUP));
                break;
        }
    }

    protected dispatchKeyPress(arg0: CanvasMouseEvent) {}
    protected dispatchKeyDown(arg0: CanvasMouseEvent) {}
    protected dispatchKeyUp(arg0: CanvasMouseEvent) {}
    protected dispatchMouseDrag(arg0: CanvasMouseEvent) {}
    protected dispatchMouseMove(arg0: CanvasMouseEvent) {}
    protected dispatchMouseUp(arg0: CanvasMouseEvent) {}
    protected dispatchMouseDown(arg0: CanvasMouseEvent) {}

    public start(): void {
        if (!this._start) {
            this._start = true;
            // this._requestId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._requestId = requestAnimationFrame((msec: number): void => {
                this.step(msec);
            });
            // this._requestId = requestAnimationFrame(this.step.bind(this));
        }
    }

    public isRuning(): boolean {
        return this._start;
    }

    public stop(): void {
        if (this._start) {
            cancelAnimationFrame(this._requestId);
            // this._requestId = -1;
            this._lastTime = -1;
            this._startTime = -1;
            this._start = false;
        }
    }

    protected step(timeStamp: number): void {
        if (this._startTime === -1) this._startTime = timeStamp;
        if (this._lastTime === -1) this._lastTime = timeStamp;
        let elapsedMsec = timeStamp - this._startTime;
        let intervalSec = timeStamp - this._lastTime;

        if (intervalSec !== 0) {
            this._fps = 1000.0 / intervalSec;
        }
        intervalSec /= 1000.0;
        this._lastTime = timeStamp;
        this._handleTimers(intervalSec);
        this.update(elapsedMsec, intervalSec);
        this.render();
        if (this.frameCallback !== null) {
            this.frameCallback(this);
        }
        requestAnimationFrame((elapsedMsec: number): void => {
            this.step(elapsedMsec);
        });
    }

    private _handleTimers(intervalSec: number) {
        for (let i = 0; i < this.timers.length; i++) {
            let timer: Timer = this.timers[i];
            if (!timer.enabled) continue;
            timer.countdown -= intervalSec;
            if (timer.countdown < 0.0) {
                timer.callback(timer.id, timer.callbackData);
                if (!timer.onlyOnce) {
                    // 如果是重复触发，重新将countdown设置为timeout
                    timer.countdown = timer.timeout;
                } else {
                    this.removeTimer(timer.id);
                }
            }
        }
    }

    protected getMouseCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    // 这里提供空方法给子类自己实现
    public render(): void {}

    public update(elapsedMsec: number, intervalSec: number) {}

    // 将鼠标位置转换为基于canvas坐标系的坐标位置
    protected viewportToCanvasCoordinate(e: MouseEvent): vec2 {
        let rect: ClientRect = this.getMouseCanvas().getBoundingClientRect();
        if (e.target) {
            let x: number = e.clientX - rect.left;
            let y: number = e.clientY - rect.top;

            if (this.isFlipYCoord) {
                y = this.getMouseCanvas().height - y;
            }
            let pos: vec2 = new vec2([x, y]);
            return pos;
        }
        throw new Error('Uncaught error: target is null');
    }

    private _toCanvasMouseEvent(e: Event, type: EInputEventType): CanvasMouseEvent {
        let event: MouseEvent = e as MouseEvent;
        if (type === EInputEventType.MOUSEDOWN && event.button === 2) {
            this._isRightMouseDown = true;
        } else if (type === EInputEventType.MOUSEUP && event.button === 2) {
            this._isRightMouseDown = false;
        }
        let buttonNum: number = event.button;
        if (this._isRightMouseDown && type === EInputEventType.MOUSEDRAG) {
            buttonNum = 2;
        }

        let mousePosition: vec2 = this.viewportToCanvasCoordinate(event);
        let canvasMouseEvent: CanvasMouseEvent = new CanvasMouseEvent(
            type,
            mousePosition,
            buttonNum,
            event.altKey,
            event.ctrlKey,
            event.shiftKey
        );
        return canvasMouseEvent;
    }

    private _toCanvasKeyBoardEvent(e: Event, type: EInputEventType): CanvasKeyBoardEvent {
        let event: KeyboardEvent = e as KeyboardEvent;
        let canvasKeyboardEvent: CanvasKeyBoardEvent = new CanvasKeyBoardEvent(
            type,
            event.key,
            event.keyCode,
            event.repeat,
            event.altKey,
            event.ctrlKey,
            event.shiftKey
        );
        return canvasKeyboardEvent;
    }

    public removeTimer(id: number):boolean {
        let found: boolean = false;
        for (let i = 0; i < this.timers.length; i++) {
            if (this.timers[i].id === id) {
                let timer: Timer = this.timers[i];
                // 标记删除，实际没有删除，也就是逻辑删除
                timer.enabled = false;
                found = true;
                break;
            }
        }
        return found;
    }

    public addTimer(
        callback: TimerCallback, 
        timeout: number = 1.0,
        onlyOnce: boolean = false,
        data: any = undefined
    ): number {
        let timer: Timer;
        let found: boolean = false;
        for (let i = 0; i < this.timers.length; i++) {
            let timer: Timer = this.timers[i];
            if (!timer.enabled) {
                timer.callback = callback;
                timer.callbackData = data;
                timer.timeout = timeout;
                timer.countdown = timeout;
                timer.enabled = true;
                timer.onlyOnce = onlyOnce;
                return timer.id;
            }
        }
        timer = new Timer(callback);
        timer.callbackData = data;
        timer.timeout = timeout;
        timer.countdown = countdown;
        timer.enabled = true;
        timer.id = ++this._timeId;
        timer.onlyOnce = onlyOnce;
        this.timers.push(timer);
        return timer.id;
    }
}