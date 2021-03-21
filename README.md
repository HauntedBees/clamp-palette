# Clamp Palette

This will limit an image's color palette to a user-provided array of colors.

## Install

```shell
npm install clamp-palette
```

## Usage

```js
const ClampPalette = require("clamp-palette").default;
ClampPalette({
    imagePath: "path to image file",
    imageBuffer: "optionall use a buffer instead",
    colors: ["an array of #RRGGBB colors"],
    mimetype: "the mime type of the output image; image/png by default, image/jpeg and image/bmp are also supported",
    callback: (buffer) => console.log("a callback where you can do whatever you want with the resultant buffer"),
    errorcallback: (error) => console.log("callback for if it fails")
});
```

## Contributing

Sure.

## License

Code is licensed under the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html). I am not a lawyer, but what I *intend* for that to mean is, if you use this to generate images locally or as a dev dependency for something, have fun. If you use it as a standard dependency for your project and its code is included in your app/package/whatever, then you must distribute your work under an AGPL-compatible license.