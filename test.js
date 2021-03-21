const gunk = require("./dist/index").default;
const fs = require("fs");

gunk({
    imagePath: "E:/GitHub/CropRPG/img/colorPreview.png",
    colors: ["#FF0000", "#0000FF"],
    callback: function(image) {
        fs.writeFileSync("E:/GitHub/CropRPG/img/colorPreviewNEW.png", image);
    }
})