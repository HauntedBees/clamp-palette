const ClampPalette = require("./dist/index.js").default;
const path = require("path");
const fs = require("fs");

// GameBoy-ify the GameBoy
ClampPalette({
    imagePath: path.join(__dirname, "examples/gameboy-in.jpg"),
    colors: ["#081820", "#346856", "#88C070", "#E0F8D0"],
    mimeType: "image/jpeg",
    errorcallback: err => console.log(err),
    callback: buffer => fs.writeFileSync(path.join(__dirname, "examples/gameboy-out.jpg"), buffer)
});

// Sepia the Bees
ClampPalette({
    imagePath: path.join(__dirname, "examples/bees-in.png"),
    colors: [
        "#FF962D", "#F28E2B", "#E58429", "#D87C27", "#CC7326", "#BF6A24", "#B26221", "#A5591F", "#99501D", "#8C481A", "#7F4118",
        "#723915", "#663313", "#592C10", "#4C250D", "#3F1E0B", "#331709", "#261006", "#190A04", "#0C0502", "#000000"
    ],
    errorcallback: err => console.log(err),
    callback: buffer => fs.writeFileSync(path.join(__dirname, "examples/bees-out.png"), buffer)
});

// Sharpen the Spaghetti
const spaghetti = fs.readFileSync(path.join(__dirname, "examples/spaghetti-in.jpg"));
ClampPalette({
    imageBuffer: spaghetti,
    colors: [ "#000000", "#0000FF", "#00FF00", "#00FFFF", "#FF0000", "#FF00FF", "#FFFF00", "#FFFFFF" ],
    mimeType: "image/jpeg",
    errorcallback: err => console.log(err),
    callback: buffer => fs.writeFileSync(path.join(__dirname, "examples/spaghetti-out.jpg"), buffer)
});

// Trigger an Error I Guess
ClampPalette({ errorcallback: err => console.log(err) });