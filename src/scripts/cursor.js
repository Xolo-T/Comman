class Cursor {
  constructor(context, tileSize) {
    this.row = 0;
    this.col = 0;
    this.context = context;
    this.tileSize = tileSize;
  }

  drawCursorLine() {
    let size = this.tileSize;
    let row = this.row;
    let col = this.col;
    this.context.beginPath();
    this.context.moveTo(col * size + 1/5*size, row * size + 1/5*size);
    this.context.lineTo(col * size + 1/5*size, row * size + 4/5*size);
    this.context.lineWidth = 2;
    this.context.stroke();
  }

  removeCursorLine() {
    let tileSize = this.tileSize;
    this.context.beginPath();

    this.context.rect(
      this.col * tileSize + 1/10 * tileSize,
      this.row * tileSize + 1/10 * tileSize,
      tileSize * 1/5,
      tileSize * 4/5
    );
    this.context.fillStyle = 'white';
    this.context.fill();
  }

  drawBlinkingCursor() {
    this.drawCursorLine();
    let self = this;

    this.interval = setInterval(function() {
      self.drawCursorLine();
      setTimeout(function() {
        self.removeCursorLine();
      }, 400);
    }, 800);
  }

  clearExistingCursor() {
    clearInterval(this.interval);
    this.removeCursorLine();
  }

  updatePosition(row, col) {
    this.row = row;
    this.col = col;
  }
}
export default Cursor;