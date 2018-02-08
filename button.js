class Button {
  constructor(x,y,width,height,nn,data,text,color,autotrain_val) {
    // Display values
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.color = color;

    // Usually references Neural Network, but sometimes used to pass functions
    this.nn = nn;

    // Auto training data
    this.data = data;
    this.autotrain_val = autotrain_val;
  }

  // Displays button with values
  draw() {
    textSize(15);
    rectMode(CENTER);
    noStroke();
    fill(this.color);
    rect(this.x,this.y,this.width,this.height);
    fill(255);
    text(this.text,this.x,this.y);
  }

  // Check if a user clicked this button
  checkClick() {
    // Only runs if mouse is inside the button
    if (mouseX - width/2 > this.x - this.width/2 && mouseX - width/2 < this.x + this.width/2 && mouseY > this.y - this.height/2 && mouseY < this.y + this.height/2) {
      // Select random data set from training data
      let d = random(this.data);
      // Loop through possible buttons
      switch(this.text) {
        case "FeedForward":
          // Generate guess with selected random input
          this.nn.feedForward(d.inputs);
          return;
        case "Train":
          // Train using selected random input and target
          this.nn.train(d.inputs,d.targets);
          return;
        case ("Auto Train (" + this.autotrain_val + " sims)"):
          // Call autoTrain passed through data parameter
          this.nn()
          return;
        case "Save Data":
          // Call enableSaveRequest passed through data parameter
          this.nn()
          return;
        default:
          return;
      }
    }
  }
}
