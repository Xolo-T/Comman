import Grid from "./scripts/grid";

let canvas = document.getElementById('canvas-board');
let context = canvas.getContext('2d');
// context.fillText('Hello world', 10, 50);
// context.fillText('Hello', 100, 250);
// context.fillText('Hello', 150, 440);
// context.fillText('Hello', 200, 350);
// context.fillText('Hello', 300, 440);

const myGrid = new Grid(context)
myGrid.render()