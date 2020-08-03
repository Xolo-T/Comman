import Board from './board';
import Tile from './tile';
import Cursor from "./cursor";

import swal from "sweetalert";

class View {
    constructor(context, boardSize, board) {
        this.context = context;
        this.board = new Board(this, boardSize, board);
        this.animationQueue = [];
        this.paused = true;
        this.animationCount = 0;
    }

    renderTile(tile) {
        this.clearTile(tile);
        let size = tile.tileSize;
        this.context.font = tile.font;
        this.context.fillStyle = tile.color;
        this.context.fillText(tile.val, tile.col * size + 25, tile.row * size + 45);
    }

    clearTile(tile) {
        this.context.beginPath();
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
        this.animationQueue.push(tile);
    }

    animate() {
        if (this.animationQueue.length === 0 || this.paused) { return; }
        this.updateIterationCount();
        let tile = this.animationQueue.shift();

        let self = this;
        let timing = document.getElementById('slider').value;
        setTimeout(function () {
            if (tile.val === "") {
                self.clearTile(tile);
            } else {
                self.renderTile(tile);
            }
            self.animate();
        }, timing);
    }

    drawBoard() {
        let tileSize = this.board.size / 9;
        let context = this.context;
        context.beginPath();
        context.rect(0, 0, this.board.size, this.board.size);
        context.fillStyle = 'white';
        context.fill();

        // big lines
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                context.beginPath();
                context.rect(i * 3 * tileSize, j * 3 * tileSize, 3 * tileSize, 3 * tileSize);
                context.lineWidth = 4;
                context.stroke();
            }
        }

        // small lines
        for (let i = 0; i < 9; i++) {
            context.beginPath();
            context.moveTo(i * tileSize, 0);
            context.lineTo(i * tileSize, this.board.size);
            context.lineWidth = 1;
            context.stroke();

            context.beginPath();
            context.moveTo(0, i * tileSize);
            context.lineTo(this.board.size, i * tileSize);
            context.stroke();
        }

        // tiles
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let tileValue = this.board.grid[i][j] === "." ? "" : this.board.grid[i][j];
                let tile = new Tile(tileValue, i, j, tileSize, '#007acc', '35px Patrick Hand');
                setTimeout(function () {
                    this.renderTile(tile);
                }.bind(this), j * 125);
            }
        }
    }

    activateInput() {
        this.deactivateInput(); 
        this.board.removePuzzle();
        this.drawBoard();
        this.paused = true;
        this.animationQueue = []; 

        this.cursor = new Cursor(this.context, this.board.size / 9);
        this.cursor.drawBlinkingCursor();

        // let canvas = document.getElementById('canvas');
        let canvas = document.getElementById('canvas-board');
        let mouseListener = this.mouseListener.bind(this);
        canvas.addEventListener('mousedown', mouseListener);

        let keyListener = this.keyListener.bind(this);
        document.addEventListener('keydown', keyListener);

        let buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function () {
                canvas.removeEventListener('mousedown', mouseListener);
                document.removeEventListener('keydown', keyListener);
            });
        }
    }

    mouseListener(e) {
        this.cursor.clearExistingCursor();
        let tileSize = this.board.size / 9;

        let row = Math.floor(e.offsetY / tileSize);
        let col = Math.floor(e.offsetX / tileSize);
        this.cursor.updatePosition(row, col);
        this.cursor.drawBlinkingCursor();
    }

    keyListener(e) {
        const vals = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        let tileSize = this.board.size / 9;
        let cursor = this.cursor;

        if (vals.has(e.key)) {
            this.board.assignVal(cursor.row, cursor.col, e.key);

            if (!this.board.isValidPuzzle()) {
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // swal(
                //   "",
                //   "",
                //   ""
                // );
                swal({
                  title: "Sorry, Invalid Puzzle!",
                  text:
                    "For a Sudoku puzzle to be valid it should appear once in its row, column, and subgrid",
                  icon: "warning",
                  button: "Ooh, ok!",
                });
                // window.alert("&#128125;");
                this.board.assignVal(cursor.row, cursor.col, ".");
                return;
            }

            let tile = new Tile(e.key, cursor.row, cursor.col, tileSize, '#007acc', '35px Patrick Hand');
            this.renderTile(tile);

        } else if (e.keyCode >= 37 && e.keyCode <= 40) {
            // move cursor with arrow keys
            cursor.clearExistingCursor();
            if (e.key === "ArrowDown" && cursor.row < 8) { cursor.row += 1; }
            if (e.key === "ArrowUp" && cursor.row > 0) { cursor.row -= 1; }
            if (e.key === "ArrowRight" && cursor.col < 8) { cursor.col += 1; }
            if (e.key === "ArrowLeft" && cursor.col > 0) { cursor.col -= 1; }
            cursor.drawBlinkingCursor();

        } else if (e.code === "Space") {
            this.board.assignVal(cursor.row, cursor.col, ".");
            let emptyTile = new Tile("", cursor.row, cursor.col, tileSize);
            this.clearTile(emptyTile);
        }
    }

    deactivateInput() {
        if (this.cursor) { this.cursor.clearExistingCursor(); }
    }

    updateIterationCount() {
        this.animationCount++;
        document.getElementById('iteration-count').innerHTML = this.animationCount;
    }

    resetIterationCount() {
        this.animationCount = 0;
        document.getElementById('iteration-count').innerHTML = 0;
    }

    skipAnimation() {
        this.paused = true;
        setTimeout(function () {
            // to ensure values arent messed up by values in the event queue 
            this.animationQueue.forEach(tile => {
                this.renderTile(tile);
                this.updateIterationCount();
            });
            this.animationQueue = [];
        }.bind(this), 100);
    }
}

export default View;