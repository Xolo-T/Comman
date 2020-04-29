import puzzleArrays from "./puzzles";

class Grid{
    constructor(context){
        this.context = context;
    }
    
    render(){
        for (let i = 0; i < 9; i++) {
            this.context.moveTo(i * 150, 0);
            this.context.lineTo(i * 150, 450);
            this.context.lineWidth = 4;
            this.context.stroke();
        }
        for (let j = 0; j < 9; j++) {
            this.context.moveTo(0, j * 150);
            this.context.lineTo(450, j * 150);
            this.context.lineWidth = 4;
            this.context.stroke();
        }

        for (let i = 0; i < 9; i++) {
            this.context.lineWidth = 0.5;
            this.context.moveTo(i * 50, 0);
            this.context.lineTo(i * 50, 450);
            this.context.stroke();
        }
        for (let j = 0; j < 9; j++) {
            this.context.lineWidth = 0.5;
            this.context.moveTo(0, j * 50);
            this.context.lineTo(450, j * 50);
            this.context.stroke();
        }
    }

    fill() {
        const puzzle = puzzleArrays[1]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let numValue = puzzle[i][j];
                if (numValue === 0){
                    numValue = ""
                }
                this.context.beginPath();
                // this math here is bananas i still fully dont get it
                this.context.rect(j * 50 + 4, i * 50 + 2, 40, 40);
                this.context.fillStyle = 'white';
                this.context.fill();
                this.context.font = '38px sans-serif';
                this.context.fillStyle = 'red';
                let size = 49;
                this.context.fillText(numValue, j * size + 25, i * size + 45);
            }
        }
    }

}

export default Grid;