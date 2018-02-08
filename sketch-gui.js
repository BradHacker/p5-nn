let nn;
let buttons = [];
let num_sims_box;
let auto_train_button;
let autoTrainAmount = 0;
let autoTrain_progressText = "Auto Train Not Started."
let totalTrainings = 0;
let totalTrainings_text_a = 0;

let training_data = [
  {
    inputs: [0,1],
    targets: [1]
  },
  {
    inputs: [1,0],
    targets: [1]
  },
  {
    inputs: [1,1],
    targets: [0]
  },
  {
    inputs: [0,0],
    targets: [0]
  }
]

function gui_setup() {
  createCanvas(windowWidth,windowHeight-50);
  num_sims_box = createInput('');
  auto_train_button = createButton('Set Auto Train Amount');
  auto_train_button.mousePressed(setAutoTrain);

  nn = new NeuralNetwork(2, 2, 1, true);
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

  buttons.push(new Button(300,height-50,150,50,nn,training_data,"FeedForward","rgb(220,0,0)",0));
  buttons.push(new Button(-300,height-50,150,50,nn,training_data,"Train","rgb(0,0,220)",0));
  buttons.push(new Button(0,height-50,300,50,autoTrain,null,"Auto Train (0 sims)","rgb(0,220,0)",autoTrainAmount));
  buttons.push(new Button(-525,height-50,150,50,nn,null,"Save Data","rgb(0,220,180)",autoTrainAmount));
}

function gui_draw() {
  background(200)
  rectMode(CENTER);
  textSize(30)
  text(autoTrain_progressText,width/2,50);
  textSize(15);
  text("Total Trainings: " + totalTrainings_text_a,width/2,100);
  translate(windowWidth/2,0);
  nn.draw();
  buttons.map((button) => {
    //console.log(button)
    button.draw();
  })
}

function gui_mouseClicked() {
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
  autoTrain_progressText = "Auto Train Completed " + autoTrainAmount_text_a + " sims in ~" + time_text;
  totalTrainings += autoTrainAmount;
  totalTrainings_text_a = totalTrainings.toString().split("");
  totalTrainings_text_a = totalTrainings_text_a.reverse();
  if(totalTrainings_text_a.length > 3) {
    for(let i = 3; i < totalTrainings_text_a.length; i += 4) {
      totalTrainings_text_a.splice(i,0,",");
    }
  }
  totalTrainings_text_a = totalTrainings_text_a.reverse();
  totalTrainings_text_a = totalTrainings_text_a.join("");
  //console.log(totalTrainings_text_a)
}

function setAutoTrain() {
  autoTrainAmount = parseInt(num_sims_box.value());
  autoTrainAmount_text_a = autoTrainAmount.toString().split("");
  autoTrainAmount_text_a = autoTrainAmount_text_a.reverse();
  if(autoTrainAmount_text_a.length > 3) {
    for(let i = 3; i < autoTrainAmount_text_a.length; i += 4) {
      autoTrainAmount_text_a.splice(i,0,",");
    }
  }
  autoTrainAmount_text_a = autoTrainAmount_text_a.reverse();
  autoTrainAmount_text_a = autoTrainAmount_text_a.join("");
  console.log(autoTrainAmount_text_a)
  buttons[2].text = "Auto Train ("  + autoTrainAmount_text_a + " sims)";
  buttons[2].autotrain_val = autoTrainAmount_text_a;
  //console.log(autoTrainAmount)
}
