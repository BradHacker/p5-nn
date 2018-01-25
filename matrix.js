class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = new Array(rows);

    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = new Array(cols);
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.floor(Math.random()*10);
      }
    }
  }

  add(other) {
    // Are we trying to add a Matrix?
    if (other instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] += other.matrix[i][j];
        }
      }
    // Or just a single scalar value?
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] += other;
        }
      }
    }
  }

  multiply(other) {
    // Are we trying to multiply a Matrix?
    if (other instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= other.matrix[i][j];
        }
      }
      // Or just a single scalar value?
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= other;
        }
      }
    }
  }

  transpose() {
    let result = new Matrix(this.cols, this.rows);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.matrix[i][j] = this.matrix[j][i];
      }
    }
    return result;
  }
}
