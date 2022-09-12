export function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    let img = new Image()
    img.src = dataUrl
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}