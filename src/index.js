import View from "./scripts/view";
import BoardStore from "./scripts/board_store"
import "./styles/index.scss"

const solveButton = document.getElementById('solve');
solveButton.onclick = solve;

const nextPuzzleButton = document.getElementById('next-puzzle');
nextPuzzleButton.onclick = resetBoard;

const creatPuzzleButton = document.getElementById('create-puzzle');
creatPuzzleButton.onclick = activateInput;

const animationSpeed = document.getElementById('animation-speed');
const iterationsDiv = document.getElementById('iterations-div');
const controlsButtonsDiv = document.getElementById('controls-buttons');

/////////////////////////////////////////////////////////////////////////////////////////

const canvas = document.getElementById('canvas-board');
const context = canvas.getContext('2d');
var boardSize = 450;
var boards = BoardStore;
// console.log(boards);

Array.prototype.dupBoard = function () {
    let newBoard = new Array(9);
    for (let i = 0; i < 9; i++) { newBoard[i] = (new Array(9)); }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            newBoard[i][j] = this[i][j].slice();
        }
    }
    return newBoard;
};


var view = new View(context, boardSize, boards[0].dupBoard());
view.drawBoard();

function solve() {
    hideInstructions();
    view.deactivateInput();
    view.board.solve();

    if (view.paused) {
        view.paused = !view.paused;
        view.animate();
        document.getElementById('solve').textContent = 'Pause';
    } else {
        view.paused = !view.paused;
        document.getElementById('solve').textContent = 'Solve';
    }
}

function resetBoard() {
    view.paused = true;
    view.deactivateInput();
    view.resetIterationCount();
    hideInstructions();
    document.getElementById('solve').textContent = 'Solve';

    var randIdx = Math.floor(Math.random() * (boards.length));
    view = new View(context, boardSize, boards[randIdx].dupBoard());
    view.drawBoard();
}

function activateInput() {
    view.resetIterationCount();
    creatPuzzleButton.blur();
    document.getElementById('solve').textContent = 'Solve';
    // document.getElementsByClassName('instructions-container')[0].style.visibility = 'visible';
    view.activateInput();
}

function hideInstructions() {
    // document.getElementsByClassName('instructions-container')[0].style.visibility = 'hidden';
}

