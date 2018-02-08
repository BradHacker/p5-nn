class Button {
  constructor(x,y,width,height,nn,data,text,color,autotrain_val) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.nn = nn;
    this.data = data;
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
      let d = random(this.data);
      switch(this.text) {
        case "FeedForward":
          this.nn.feedForward(d.inputs);
          return;
        case "Train":
          this.nn.train(d.inputs,d.targets);
          return;
        case ("Auto Train (" + this.autotrain_val + " sims)"):
          //console.log("skfh")
          this.nn()
          return;
        case "Save Data":
          // const fs = require('fs')
          // fs.writeFile('data.json', JSON.stringify(this.nn, {indent: true}), (err) => {
          //   if (err) throw err;
          //   console.log('Data Saved!');
          // });
          console.log(JSON.stringify(this.nn, {indent: true}));
          return;
        default:
          return;
      }
    }
  }
}
