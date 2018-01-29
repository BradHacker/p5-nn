class Button {
  constructor(x,y,width,height,nn,ins,text,color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.nn = nn;
    this.ins = ins;
    this.text = text;
    this.color = color;
  }

  draw() {
    rectMode(CENTER);
    noStroke();
    fill(this.color);
    rect(this.x,this.y,this.width,this.height);
    fill(255);
    text(this.text,this.x,this.y);
  }

  checkClick() {
    if (mouseX - width/2 > this.x - this.width/2 && mouseX - width/2 < this.x + this.width/2 && mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      switch(this.text) {
        case "FeedForward":
          this.nn.feedForward(this.ins)
        case "Train":
          this.nn.train(this.ins,this.ins)
      }
    }
  }
}
