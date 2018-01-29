let nn;
let buttons = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  // let inputs = [[1,0],[0,1]];
  // let targets = [[1,0],[0,1]];
  nn = new NeuralNetwork(2, 3, 2);
  // // let inputs = [[1],[0]];
  // // let targets = [[1],[0]];
  // //let output = nn.feedForward(input);
  // for(let a = 0; a < 10; a++) {
  //   for(let i = 0; i < inputs.length; i++) {
  //     nn.train(inputs[i], targets[i]);
  //   }
  // }
  let trial = [1,0]
  // let output = nn.feedForward(trial)
  // console.log(trial)
  // console.log(output)
  // trial = [0,1]
  // output = nn.feedForward(trial)
  // console.log(trial)
  // console.log(output)

  buttons.push(new Button(150,height-50,150,50,nn,trial,"FeedForward","rgb(255,0,0)"));
  buttons.push(new Button(-150,height-50,150,50,nn,trial,"Train","rgb(0,0,255)"));
}

function draw() {
  translate(windowWidth/2,0);
  background(200)
  nn.draw();
  buttons.map((button) => {
    button.draw();
  })
}

function mouseClicked() {
  buttons.map((button) => {
    button.ins = [floor(random(0,2)),floor(random(0,2))]
    button.checkClick()
  })
}
