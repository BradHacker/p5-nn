let nn;
let buttons = [];
let num_sims_box;
let auto_train_button;
let autoTrainAmount = 0;
let autoTrain_progressText = "Auto Train Not Started."

function setup() {
  createCanvas(windowWidth,windowHeight-50);
  num_sims_box = createInput('');
  auto_train_button = createButton('Set Auto Train Amount');
  auto_train_button.mousePressed(setAutoTrain);

  nn = new NeuralNetwork(2, 5, 1);
  // let inputs = [[1],[0]];
  // let targets = [[0],[1]];
  // //let output = nn.feedForward(input);
  //let trial = [1]
  // let output = nn.feedForward(trial)
  // console.log(trial)
  // console.log(output)
  // trial = [0,1]
  // output = nn.feedForward(trial)
  // console.log(trial)
  // console.log(output)
  let inputs = [[1,0],[0,1],[1,1],[0,0]];

  buttons.push(new Button(300,height-50,150,50,nn,inputs[floor(random(0,inputs.length))],"FeedForward","rgb(220,0,0)",0));
  buttons.push(new Button(-300,height-50,150,50,nn,inputs[floor(random(0,inputs.length))],"Train","rgb(0,0,220)",0));
  buttons.push(new Button(0,height-50,300,50,autoTrain,null,"Auto Train (0 sims)","rgb(0,220,0)",autoTrainAmount));
}

function draw() {
  background(200)
  rectMode(CENTER);
  textSize(30)
  text(autoTrain_progressText,width/2,50)
  translate(windowWidth/2,0);
  nn.draw();
  buttons.map((button) => {
    //console.log(button)
    button.draw();
  })
}

function mouseClicked() {
  buttons.map((button) => {
    //button.ins = [floor(random(0,2)),floor(random(0,2))]
    button.ins = [floor(random(0,2)),floor(random(0,2))]
    button.checkClick()
  })
}

function autoTrain() {
  console.log("Auto Training " + autoTrainAmount + " times.");
  autoTrain_progressText = "Auto Training...";
  let beginTime = millis();
  let inputs = [[1,0],[0,1],[1,1],[0,0]];
  let targets = [[0],[0],[1],[1]];
  //nn.weights_ho.print();
  for(let a = 0; a < floor(autoTrainAmount/4); a++) {
    for(let i = 0; i < inputs.length; i++) {
      nn.train(inputs[i], targets[i]);
    }
  }
  //nn.weights_ho.print();
  let endTime = millis();
  let totalTime = floor((endTime - beginTime)/1000);
  //console.log(totalTime)
  let time_text = totalTime + "secs";
  if(totalTime > 59) {
    let mins = floor(totalTime/60);
    let secs = totalTime % 60;
    time_text = mins + "mins " + secs + "secs"
  }
  autoTrain_progressText = "Auto Train Completed " + autoTrainAmount + " sims in ~" + time_text;
}

function setAutoTrain() {
  autoTrainAmount = num_sims_box.value();
  autoTrainAmount_text_a = autoTrainAmount.toString().split("");
  autoTrainAmount_text_a = autoTrainAmount_text_a.reverse();
  for(let i = 1; i <= floor(autoTrainAmount_text_a.length/4); i++) {

  }
  buttons[2].text = "Auto Train ("  + autoTrainAmount + " sims)";
  buttons[2].autotrain_val = autoTrainAmount;
  //console.log(autoTrainAmount)
}
