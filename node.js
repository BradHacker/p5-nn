class Node {
  constructor(_layer, _n, _nTotal) {
    this.layer = _layer;
    this.n = _n;
    this.n_total = _nTotal;
    this.value = 0;

    // Display values
    this.padding_y = 400;
    this.padding_x = this.padding_y*2;
    this.width = width - this.padding_x;
    this.height = height - this.padding_y;
    this.h_inc = this.n_total === 1 ? 1 : this.height / (this.n_total - 1);
    this.x = this.layer * this.width / 2;
    this.y = (this.padding_y/2) + (this.n * this.h_inc);
    this.size = 80;
  }

  // Draw node and value
  draw() {
    fill(0)
    stroke(0)
    ellipse(this.x,this.y,this.size,this.size);
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    fill(255);
    //console.log(typeof this.value)
    if (typeof this.value === "number") {
      text(this.value.toFixed(3).toString(),this.x,this.y);
    }
  }
}
