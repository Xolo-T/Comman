import Grid from "./scripts/grid";
import puzzleArrays from "./scripts/puzzles"
import "./styles/index.scss"

const canvas = document.getElementById('canvas-board');
const context = canvas.getContext('2d');


let puzzleIndex = 0;
let changeChecker = 0;
const puzzles = puzzleArrays;

const solveButton = document.getElementById('solve');
solveButton.onclick = solve;

const nextPuzzleButton = document.getElementById('next-puzzle');
nextPuzzleButton.onclick = changePuzzle;

const creatPuzzleButton = document.getElementById('create-puzzle');
// nextPuzzleButton.onclick = changePuzzle

const animationSpeed = document.getElementById('animation-speed')
const iterationsDiv = document.getElementById('iterations-div')
const validityStatus = document.getElementById('validity-status')
const controlsButtonsDiv = document.getElementById('controls-buttons')

const puzzle = puzzles[puzzleIndex];
// debugger
// const myGrid = new Grid(context, puzzle)
let myGrid = new Grid(context, puzzles[puzzleIndex])
myGrid.render()
myGrid.fill();


function isValidSudoku(sudoku) {
    // debugger
    const rows = {
        0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
    };
    const cols = {
        0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
    };
    const SubGrid = {
        0:[], 1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[], 8:[]
    };

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const currentValue = sudoku[i][j]
            if (currentValue !== 0){
                // debugger
                // Cheking the rows
                if (rows[i].includes(currentValue)) {
                    return false
                }else{
                    rows[i].push(currentValue)
                }
                // Cheking the colums
                if (cols[j].includes(currentValue)) {
                    return false
                } else {
                    cols[j].push(currentValue)
                }
                // Cheking the subgrig some math will be involved
                // const k = 'bananas';
                const k = Math.floor((j) / 3) + Math.floor((i) / 3) * 3
                // debugger
                if (SubGrid[k].includes(currentValue)) {
                    return false
                } else {
                    SubGrid[k].push(currentValue)
                }
                // debugger
            }
        }   
    }
    return true
}

const validity = document.getElementById('validity');
validity.innerText = isValidSudoku(puzzle);

function changePuzzle() { // resets the board with a new puzzle
    // debugger
    myGrid.paused = true; // fixes a dug that if you change a puzzle it doesnt keep solving the previous one
    myGrid.resetIterationCount();

    if (puzzleIndex < (puzzles.length - 1)) {
        puzzleIndex += 1;
    } else {
        puzzleIndex = 0;
    }
    // debugger
    myGrid = new Grid(context, puzzles[puzzleIndex])
    // debugger
    myGrid.fill();
    validity.innerText = isValidSudoku(puzzles[puzzleIndex]);
    if (!isValidSudoku(puzzles[puzzleIndex])) {
        solveButton.style.display = 'none';
        animationSpeed.style.display = 'none';
        iterationsDiv.style.display = 'none';
        validityStatus.style.display = 'flex';
        validityStatus.style.justifyContent = 'center';
        controlsButtonsDiv.style.justifyContent = 'flex-end';
        // debugger

        // validOnlyElements.forEach(element => {
        //     element.style.display = 'none'
        // });
    }else{
        solveButton.style.display = 'block';
        animationSpeed.style.display = 'block';
        iterationsDiv.style.display = 'block';
        validityStatus.style.display = 'none';
        controlsButtonsDiv.style.justifyContent = 'space-between';
        // validOnlyElements.forEach(element => {
        //     element.style.display = 'block'
        // });
    }

    // myGrid.paused = !myGrid.paused;
    document.getElementById('solve').textContent = 'Solve';

}

function solve() {
    // debugger
    // hideInstructions();
    // myGrid.deactivateInput();
    // myGrid.board.solveSudoku();
    myGrid.solveSudoku();
    // myGrid.animate();
    if (myGrid.paused) {
        myGrid.paused = !myGrid.paused;
        myGrid.animate();
        document.getElementById('solve').textContent = 'Pause';
    } else {
        myGrid.paused = !myGrid.paused;
        document.getElementById('solve').textContent = 'Solve';
    }
}

// var solveButton = document.getElementById('solve');
// solveButton.onclick = solve;



