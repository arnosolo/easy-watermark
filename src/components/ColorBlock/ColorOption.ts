export class ColorOption {
  color: string
  borderColor: string
  hasOutborder: boolean
  isActived: boolean
  constructor(config: {
    color?: string,
    borderColor?: string,
    hasOutborder?: boolean,
    isActived?: boolean
  }) {
    const { color, borderColor, hasOutborder, isActived } = config
    this.color = color ?? "#ffaa00"
    this.borderColor = borderColor ?? "#ffffff"
    this.hasOutborder = hasOutborder ?? false
    this.isActived = isActived ?? false
  }
}