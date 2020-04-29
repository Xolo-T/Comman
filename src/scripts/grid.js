class Grid{
    constructor(context){
        this.context = context;
    }
    
    render(){
        // this.context.fillText(8, 200, 50);   
        // this.context.fillText('22', 200, 140);

        // this.context.fillText('22', 40, 210);
        // this.context.fillText('22', 350, 400);

        // for (let i = i; i < 10; i++) {
        //     // setTimeout
        //     this.context.fillText('hi', 20*i, 50);     
        //     debugger       
        // }


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
            this.context.lineWidth = 1;
            this.context.moveTo(i * 50, 0);
            this.context.lineTo(i * 50, 450);
            this.context.stroke();
        }
        for (let j = 0; j < 9; j++) {
            this.context.moveTo(0, j * 50);
            this.context.lineTo(450, j * 50);
            this.context.stroke();
        }



    }
}

export default Grid;