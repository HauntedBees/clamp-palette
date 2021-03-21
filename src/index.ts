const JimpObj = require("jimp");
import JimpClass from "jimp";
// gotta use separate imports for each because TypeScript won't play nice with Jimp otherwise.

export interface ClampOptions {
    imagePath?:string;
    imageBuffer?:Buffer;
    colors:string[];
    callback:(img:Buffer) => any;
    errorcallback:(e:Error) => any;
    mimeType?:string;
}

const HexToRGB = (hex:string) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : null;
};
const ClampPalette = function(options:ClampOptions) {
    if(!options.colors || !options.colors.length) { return options.errorcallback(new Error("Palette must be provided.")); }

    const realColors = options.colors.map(c => HexToRGB(c));
    const callback = (err:(Error|null), image:JimpClass) => {
        if(err) {
            options.errorcallback(err);
            return;
        }
        const w = image.getWidth(), h = image.getHeight();
        for(let x = 0; x < w; x++) {
            for(let y = 0; y < h; y++) {
                const myColor = JimpObj.intToRGBA(image.getPixelColor(x, y));
                if(myColor.a === 0) { continue; }
                let lowestDistance = 99999, lowestIdx = -1;
                for(let i = 0; i < realColors.length; i++) {
                    const testColor = realColors[i];
                    if(testColor === null) { return options.errorcallback(new Error("Invalid palette. All values must be hexadecimal colors.")); }
                    const dr = testColor.r - myColor.r;
                    const dg = testColor.g - myColor.g;
                    const db = testColor.b - myColor.b;
                    const myDist = dr * dr + dg * dg + db * db;
                    if(myDist < lowestDistance) {
                        lowestDistance = myDist;
                        lowestIdx = i;
                    }
                }
                const newColor = realColors[lowestIdx];
                if(newColor === null) { return options.errorcallback(new Error("Invalid palette. All values must be hexadecimal colors.")); }
                image.setPixelColor(JimpObj.rgbaToInt(newColor.r, newColor.g, newColor.b, myColor.a), x, y);
            }
        }
        image.getBuffer(options.mimeType || "image/png", (err:(Error|null), image:Buffer) => {
            if(err) { options.errorcallback(err); }
            else { options.callback(image); }
        });
    };
    if(options.imagePath) {
        JimpObj.read(options.imagePath, callback);
    } else if(options.imageBuffer) {
        JimpObj.read(options.imageBuffer, callback);
    } else {
        return options.errorcallback(new Error("No image provided."));
    }
};

export default ClampPalette;