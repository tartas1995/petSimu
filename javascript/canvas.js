const CANVAS_WIDTH = 64;
let CANVAS_HEIGHT;

let canvas;
let ctx;

export default function init() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext('2d');
    prepareCanvas();
    testDraw();
}

function prepareCanvas() {
    const offsetWidth = canvas.offsetWidth;
    const offsetHeight = canvas.offsetHeight;
    const offsetRatio = offsetHeight / offsetWidth;
    canvas.width = CANVAS_WIDTH;
    CANVAS_HEIGHT = Math.round(CANVAS_WIDTH * offsetRatio);
    canvas.height = CANVAS_HEIGHT;
    const dpi = window.devicePixelRatio;
    const originalHeight = canvas.height;
    const originalWidth = canvas.width;
    const dimensions = getObjectFitSize(true, canvas.clientWidth, canvas.clientHeight, canvas.width, canvas.height);
    canvas.width = dimensions.width * dpi;
    canvas.height = dimensions.height * dpi;
    const ratio = Math.min(
        canvas.clientWidth / originalWidth,
        canvas.clientHeight / originalHeight
    )
    ctx.scale(ratio * dpi, ratio * dpi);
    ctx.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
}

function getObjectFitSize(contains, containerWidth, containerHeight, width, height) {
    const doRatio = width / height;
    const cRatio = containerWidth / containerHeight;
    let targetWidth = 0;
    let targetHeight = 0;
    const test = contains ? doRatio > cRatio : doRatio < cRatio;
    if (test) {
        targetWidth = containerWidth;
        targetHeight = targetWidth / doRatio;
    } else {
        targetHeight = containerHeight;
        targetWidth = targetHeight * doRatio;
    }
    return {
        width: targetWidth,
        height: targetHeight,
        x: (containerWidth - targetWidth) / 2,
        y: (containerHeight - targetHeight) / 2
    }
}

function testDraw() {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(-16, -16, 32, 32);
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(0, 0, 1, 1);
}