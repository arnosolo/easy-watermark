export class Vector2 {
  x: number
  y: number
  constructor(x: number, y:number) {
    this.x = x ?? 0
    this.y = y ?? 0
  }

  // res = a - b
  static sub(a: Vector2, b:Vector2, res: Vector2) {
    res.x = a.x - b.x,
    res.y = a.y - b.y
  }
}
