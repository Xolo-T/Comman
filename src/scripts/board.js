import Tile from "./tile";

class Board {
  constructor(givenView, boardSize, board) {
    this.grid = board;
    this.view = givenView;
    this.size = boardSize;
  }

  isValidPuzzle() {
    // checks if a number is repeted on a row,column , or subgrid
    for (let i = 0; i < 9; i++) {
      let rowNums = new Set;
      let colNums = new Set;
      let subGridNums = new Set;
      let currentVal;

      for (let j = 0; j < 9; j++) {
        currentVal = this.grid[i][j];
        // rows
        // Checks to see if the value is already available in current row
        if (rowNums.has(this.grid[i][j])) {return false;}
        if (this.grid[i][j] !== ".") {rowNums.add(this.grid[i][j]);}

        // columns
        // Checks to see if the value is already available in current column
        if (colNums.has(this.grid[j][i])) {return false;}
        if (this.grid[j][i] !== ".") {colNums.add(this.grid[j][i]);}

        // subgrid
        // Checks to see if the value is already available in subGrid
        // I dont trust this math might cause errors 
        let currentRow = 3 * Math.floor(i/3) + Math.floor(j/3);
        let currentCol = 3 * (i % 3) + (j % 3);
        if (subGridNums.has(this.grid[currentRow][currentCol]) ) {return false;}
        if (this.grid[currentRow][currentCol] !== ".") {subGridNums.add(this.grid[currentRow][currentCol]);}
      }
    }
    return true;
  }

  solve() {
    // This is the backtracking algorithm
    let currentVal;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        // Spit if there is a number on current position
        if (this.grid[i][j] !== ".") { continue; }

        const vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

        // Starts to try each number from 1 though 9
        for (let k = 0; k < vals.length; k++) {
          this.grid[i][j] = vals[k];

          let tile = new Tile(vals[k], i, j, this.size / 9, '#FF5964', '28px Patrick Hand');
          this.view.addToAnimationQueue(tile);

          // if a number is placed and the sudoku is valid
          // Call solve again and it will solve for the next
          if (this.isValidPuzzle() && this.solve() ) {return true;}

          // else it wasnt able to place any number backtrack
          this.grid[i][j] = ".";
        }

        let emptyTile = new Tile("", i, j, this.size / 9);
        this.view.addToAnimationQueue(emptyTile);
        return false; 
      }
    }
    return true; 
  }

  assignVal(rowNo, colNo, val) {
    this.grid[rowNo][colNo] = val;
  }

  removePuzzle() {
    this.iterationCount = 0;

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
    
  }
}


export default Board;