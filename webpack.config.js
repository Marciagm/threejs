const path = require("path");

module.exports = {
    entry: {
        'spc': "./src/spc",
        'lines': "./src/lines",
        //'text': "./src/text",
        'webgl': "./src/webgl",
        'move': "./src/move",
        'panorama': "./src/panorama",
        'texture': "./src/texture",
        'animation': "./src/animation",
        'book': "./src/book"
    },
    output: {
        path: path.resolve(__dirname, "public/js"),
        filename: "[name].js"
    }
}