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
}

export default Grid;