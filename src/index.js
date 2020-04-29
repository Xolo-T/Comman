import Grid from "./scripts/grid";

let canvas = document.getElementById('canvas-board');
let context = canvas.getContext('2d');
const myGrid = new Grid(context)
myGrid.render()

