class Connection {
  constructor(x1,y1,x2,y2,val,i,j) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.x_dist = this.x1 - this.x2;
    this.y_dist = this.y1 - this.y2;

    this.value = val;

    this.i = i;
    this.j = j;
  }

  // Display connection between two nodes with weight value
  draw() {
    strokeWeight(4);
    stroke(0);
    line(this.x1,this.y1,this.x2,this.y2);
    rectMode(CENTER);
    textAlign(CENTER,CENTER);
    fill(255);
    text(this.value.toFixed(3).toString(),this.x2+(this.x_dist/4),this.y2+(this.y_dist/4));
  }
}
