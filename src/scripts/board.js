console.log('Hello from the back')
console.log('Can you hear me?')

class Board {
    constructor(view, size, board) {
        this.size = size;
    }


    emptyBoard() {
        this.grid = [
            ".........".split(""),
            ".........".split(""),
            ".........".split(""),
            ".........".split(""),
            ".........".split(""),
            ".........".split(""),
            ".........".split(""),
            ".........".split(""),
            ".........".split("")
        ];
        this.iterationCount = 0;
    }
}

Array.prototype.dupBoard = function () {
    let newBoard = new Array(9);
    for (let i = 0; i < 9; i++) { 
        newBoard[i] = (new Array(9)); 
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            newBoard[i][j] = this[i][j].slice();
        }
    }
    return newBoard;
};
