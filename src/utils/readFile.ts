export function readFileAsync(file: File) {
  return new Promise<string>((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      if((reader.result != null) && (typeof(reader.result) == 'string')){
        resolve(reader.result);
      } else {
        console.error("Read file error")
      }
    };

    reader.onerror = reject;

    // reader.readAsArrayBuffer(file);
    reader.readAsDataURL(file);
  })
}