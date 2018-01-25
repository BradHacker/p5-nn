class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array(rows);

    for (var i = 0; i < this.rows; i++) {
      this.matrix[i] = new Array(cols);
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  randomize() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.floor(Math.random()*10);
      }
    }
  }
}
