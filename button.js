class Button {
  constructor(x,y,width,height,nn,ins,text,color,autotrain_val) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.nn = nn;
    this.ins = ins;
    this.text = text;
    this.color = color;
    this.autotrain_val = autotrain_val;
  }

  draw() {
    textSize(15);
    rectMode(CENTER);
    noStroke();
    fill(this.color);
    rect(this.x,this.y,this.width,this.height);
    fill(255);
    text(this.text,this.x,this.y);
  }

  checkClick() {
    if (mouseX - width/2 > this.x - this.width/2 && mouseX - width/2 < this.x + this.width/2 && mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      //console.log(this.nn)
      switch(this.text) {
        case "FeedForward":
          this.nn.feedForward(this.ins)
          return;
        case "Train":
          console.log(this.ins)
          let input = this.ins;
          let output = 0;
          for(let i = 0; i < input.length; i++) {
            output += input[i];
          }
          if(output === 0 || output === 2) {
            output = 1;
          } else {
            output = 0;
          }
          console.log(output)
          this.nn.train(input,[output])
          return;
        case ("Auto Train (" + this.autotrain_val + " sims)"):
          //console.log("skfh")
          this.nn()
          return;
        default:
          return;
      }
    }
  }
}
