import { Vector2 } from "./Vector";

export interface WaterMarkConfig {
  textContent?: string
  textSize?: number
  textFont?: string
  textColor?: string
  opacity?: number
  icon?: HTMLImageElement
  iconSize?: number
  iconInLeft?: boolean
  frameColor?: string
  frameWidth?: number
  gap?: number
  position?: Vector2
}

export class WaterMark {
  private _canvas: HTMLCanvasElement | undefined
  ctx: CanvasRenderingContext2D | null | undefined;
  private _position: Vector2;
  private _textContent: string;
  private _textSize: number;
  textFont: string;
  // 1: visible, 0:invisible
  private _opacity: number
  private _icon: HTMLImageElement;
  _iconSize: number;
  iconInLeft: boolean;
  gap: number;
  private _textColor: string;
  textWidth: number;
  frameColor: string;
  frameWidth: number;
  isSelected: boolean;
  distanceToMouse: Vector2;
  theta: number;
  constructor(canvas: HTMLCanvasElement | undefined, config: WaterMarkConfig) {
    const { opacity, frameWidth, frameColor, textContent, textSize, textFont, textColor, icon, iconSize, iconInLeft, gap, position } = config
    if (canvas) {
      this._canvas = canvas
      this.ctx = this._canvas.getContext('2d')
    } else {
      this._canvas = undefined
      this.ctx = null
      console.warn('New WaterMark: Canvas input is undefined, should be setted later')
    }
    this._textContent = textContent ?? "Hello World"
    this._textSize = textSize ?? 50
    this.textWidth = 0
    this.textFont = textFont ?? "Arial"
    this._textColor = textColor ?? "#ffffff"
    this._opacity = opacity ?? 1
    this._icon = icon ?? new Image()
    this._iconSize = iconSize ?? 50
    this.iconInLeft = iconInLeft ?? true
    this.frameColor = frameColor ?? "#ffaa00"
    this.frameWidth = frameWidth ?? this._iconSize * 0.1
    this.gap = gap ?? 20
    this._position = position ?? new Vector2(0, 0)
    this.distanceToMouse = new Vector2(0, 0)
    this.theta = 0
    this.isSelected = false
  }

  public get position(): Vector2 {
    return this._position
  }

  public set position(newVal: Vector2) {
    this._position = newVal
    this.refreshCanvas()
  }

  public get textSize() {
    return this._textSize;
  }

  public set textSize(newVal: number) {
    this._textSize = newVal;
    this.refreshCanvas()
  }

  public get textColor() {
    return this._textColor;
  }

  public set textColor(newVal: string) {
    this._textColor = newVal;
    this.refreshCanvas()
  }

  public get opacity() {
    return this._opacity;
  }

  public set opacity(newVal: number) {
    if(newVal > 1 || newVal < 0) {
      console.warn(`Opacity value should between 0 to 1, current ${newVal}`);
    } else {
      this._opacity = newVal;
      this.refreshCanvas()
    }
  }

  public get iconSize() {
    return this._iconSize;
  }

  public set iconSize(newVal: number) {
    this._iconSize = newVal;
    this.refreshCanvas()
  }

  public get textContent() {
    return this._textContent;
  }

  public set textContent(newContent: string) {
    this._textContent = newContent;
    this.refreshCanvas()
  }

  public get canvas() {
    return this._canvas;
  }

  public set canvas(newVal) {
    this._canvas = newVal
    this.ctx = this._canvas?.getContext('2d')
    console.log('waterMark: new canvas accepeted')
  }

  public get icon() {
    return this._icon;
  }

  public set icon(newVal) {
    this._icon = newVal
    this.refreshCanvas()
  }

  public get bigHeight() {
    return (this.textSize > this.iconSize) ? this.textSize : this.iconSize
  }

  refreshCanvas() {
    if (this.canvas) {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.show()
    }
  }

  isMouseAbove(mouse: Vector2): boolean {
    if (this.ctx?.isPointInPath(mouse.x, mouse.y)) {
      return true
    } else {
      return false
    }
  }

  show() {
    const { bigHeight, opacity, iconSize, frameWidth, frameColor, textColor, gap, ctx, position, textSize, textFont, textContent, icon } = this
    if (ctx) {
      const ratio = iconSize / icon.width
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.transform(ratio, 0, 0, ratio, position.x - iconSize, position.y - 0.5 * iconSize)
      ctx.drawImage(icon, 0, 0)
      // ctx.stroke()
      ctx.restore()

      ctx.strokeStyle = frameColor
      ctx.fillStyle = textColor
      ctx.lineWidth = frameWidth;
      ctx.textAlign = "start"
      ctx.save()
      ctx.globalAlpha = opacity
      // ctx.rotate(this.theta) 
      ctx.font = `${textSize}px ${textFont}`;
      this.textWidth = ctx.measureText(textContent).width
      ctx.fillText(textContent, position.x, position.y + 0.3 * textSize);
      ctx.beginPath()
      ctx.rect(position.x - iconSize, position.y - 0.5 * bigHeight, this.textWidth + iconSize, bigHeight)
      ctx.closePath()
      if (this.isSelected) {
        ctx.stroke()
      }
      ctx.restore()
    }
  }
}