import Compressor from 'compressorjs';

/**
 * File -> base64
 * @param {File} file <input type="file">
 * @returns {Promise<string>} base64 string
 */
export function fileToBase64(file: File): Promise<string> {
    const reader = new FileReader();

    return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result as string);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Image url -> base64
 * @param {string} url https://xxx.jpg
 * @returns {Promise<string>} base64 image string
 */
export function imageUrlToBase64(url: string): Promise<string> {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;

    return new Promise<string>((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx!.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };

        img.onerror = (err) => {
            reject(err);
        };
    });
}

export function imageDataToBase64(imageData: ImageData): string {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    ctx!.putImageData(imageData, 0, 0);
    const dataURL = canvas.toDataURL('image/jpeg');
    return dataURL;
}

export function createImageElement(url: string): Promise<HTMLImageElement> {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;

    return new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => {
            resolve(img);
        };

        img.onerror = (err) => {
            reject(err);
        };
    });
}

/**
 * Get blank image that has the same width and height as input
 * @param {string} url https://xxx.jpg or base64 image string
 * @returns {Promise<string>} base64 image string
 */
 export function getBlankBase64Image(url: string): Promise<string> {
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;

    return new Promise<string>((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx!.clearRect(0, 0, canvas.width, canvas.height)
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };

        img.onerror = (err) => {
            reject(err);
        };
    });
}

export function getImageSrc(name: string): string {
    return new URL(`../assets/${name}`, import.meta.url).href;
}

export function compressor(file: File): Promise<File> {
    return new Promise<File>((resolve, reject) => {
        new Compressor(file, {
            maxWidth: 1920,
            maxHeight: 1080,
            convertTypes: 'image/png,image/webp,image/jpeg/,image/jpg',
            convertSize: 1500000,
            success(result: File) {
                resolve(result);
            },
            error(err) {
                reject(err);
            },
        });
    });
}
