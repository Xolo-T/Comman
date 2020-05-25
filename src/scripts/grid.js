import puzzleArrays from "./puzzles";
import Tile from './tile'


class Grid{
    constructor(context, puzzle){
        this.context = context;
        this.puzzle = puzzle;
        this.animationQueue = [];

        this.boardSize = 450;
        this.animationQueue = [];
        this.paused = true;
        this.animationCount = 0;
    }
    
    render(){
        // thick grid lines
        for (let i = 0; i < 9; i++) {
            this.context.beginPath();
            // this.context.rect(i * 50 + 0, i * 50 + 0, 36, 36);
            this.context.fillStyle = 'white';
            this.context.fill();
            this.context.moveTo(i * 150, 0);
            this.context.lineTo(i * 150, 450);
            this.context.lineWidth = 4;
            this.context.stroke();
        }
        // thick grid lines
        for (let j = 0; j < 9; j++) {
            this.context.fillStyle = 'white';
            this.context.fill();
            this.context.moveTo(0, j * 150);
            this.context.lineTo(450, j * 150);
            this.context.lineWidth = 4;
            this.context.stroke();
        }
        // slim grid lines
        for (let i = 0; i < 9; i++) {
            this.context.fillStyle = 'white';
            this.context.fill();
            this.context.lineWidth = 0.5;
            this.context.moveTo(i * 50, 0);
            this.context.lineTo(i * 50, 450);
            this.context.stroke();
        }
        // slim grid lines
        for (let j = 0; j < 9; j++) {
            this.context.fillStyle = 'white';
            this.context.fill();
            this.context.lineWidth = 0.5;
            this.context.moveTo(0, j * 50);
            this.context.lineTo(450, j * 50);
            this.context.stroke();
        }
    }

    fill() {
        // fill(puzzle) {
        // const puzzle = puzzleArrays[1]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let numValue = this.puzzle[i][j];
                if (numValue === 0){
                    numValue = ""
                }
            // Cover up the prev num using a white rectangle
                this.context.beginPath();
                // this math here is bananas i still fully dont get it
            // this.context.rect(startLeft,startTop, width, height);
                this.context.rect(j * 50 + 4, i * 50 + 2, 40, 45);
                // this.context.rect(j * 50 + 4, i * 50 + 2, 40, 40);
                this.context.fillStyle = 'white';
                this.context.fill();
            // ---------------------------------------------------------
            // put a new number on the rectangle
                this.context.font = '35px Patrick Hand';
                this.context.fillStyle = '#007acc';
                let size = 49;
            // this.context.fillText(text, startLeft, startTop);
                this.context.fillText(numValue, j * size + 21, i * size + 45);
            }
        }
    }

    //---------- Puzzle Solving Algo and animation ------------------
    
    renderTile(tile) {
        // debugger
        this.clearTile(tile);
        let size = tile.tileSize;
        this.context.font = tile.font;
        this.context.fillStyle = tile.color;
        // ctx.fillText("Hello World!", x, y);
        this.context.fillText(tile.val, tile.col * size + 25, tile.row * size + 45);
    }

    clearTile(tile) {
        this.context.beginPath();
        // this.context.rect(startLeft,startTop, width, height);
        this.context.rect(
            tile.col * tile.tileSize + 1 / 10 * tile.tileSize,
            tile.row * tile.tileSize + 1 / 10 * tile.tileSize,
            tile.tileSize * 4 / 5,
            tile.tileSize * 4 / 5
        );
        this.context.fillStyle = 'white';
        this.context.fill();
    }

    addToAnimationQueue(tile) {
        // debugger
        this.animationQueue.push(tile);
    }
    
    isValidSudoku() {
        for (let i = 0; i < 9; i++) {
            let seenRowVals = new Set;
            let seenColVals = new Set;
            let seenSquareVals = new Set;

            for (let j = 0; j < 9; j++) {
                // check rows
                if (seenRowVals.has(this.puzzle[i][j])) { return false; }
                if (this.puzzle[i][j] !== 0) { seenRowVals.add(this.puzzle[i][j]); }

                // check columns
                if (seenColVals.has(this.puzzle[j][i])) { return false; }
                if (this.puzzle[j][i] !== 0) { seenColVals.add(this.puzzle[j][i]); }

                // check 3x3 squares
                let row = 3 * Math.floor(i / 3) + Math.floor(j / 3);
                let col = 3 * (i % 3) + (j % 3);
                if (seenSquareVals.has(this.puzzle[row][col])) { return false; }
                if (this.puzzle[row][col] !== 0) { seenSquareVals.add(this.puzzle[row][col]); }
            }
        }

        return true;
    }

    solveSudoku() {
        // debugger
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.puzzle[i][j] !== 0) { continue; }

                const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9];

                for (let k = 0; k < vals.length; k++) {
                    // debugger
                    this.puzzle[i][j] = vals[k];

                    // let tile = new Tile(vals[k], i, j, this.boardSize / 9, '#ababab', '28px Patrick Hand');
                    let tile = new Tile(vals[k], i, j, this.boardSize / 9, '#FF5964', '28px Patrick Hand');
                    // debugger
                    this.addToAnimationQueue(tile);
                    // debugger

                    if (this.isValidSudoku() && this.solveSudoku()) { return true; }
                    this.puzzle[i][j] = 0; //wasn't able to solve so backtrack
                }

                // let removal = new Tile("", i, j, this.size / 9);
                // debugger
                // this.addToAnimationQueue(removal);
                return false; //no vals satisfy isValidSudoku
            }
        }
        return true; //board is filled
    }

    animate() {
        // debugger
        if (this.animationQueue.length === 0 || this.paused) { 
            return; 
        }
        
        this.updateIterationCount();
        let tile = this.animationQueue.shift();

        let self = this;
        let timing = document.getElementById('slider').value;
        // debugger
        setTimeout(function () {
            if (tile.val === "") {
                self.clearTile(tile);
            } else {
                self.renderTile(tile);
            }
            self.animate();
        }, timing);
    }

    updateIterationCount() {
        this.animationCount++;
        document.getElementById('iteration-count').innerHTML = this.animationCount;
    }

    resetIterationCount() {
        this.animationCount = 0;
        document.getElementById('iteration-count').innerHTML = 0;
    }

    //-----------------------------------------------------------------------


}

export default Grid;