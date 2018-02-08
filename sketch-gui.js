let nn;
let buttons = [];
let num_sims_box;
let auto_train_button;
let autoTrainAmount = 0;
let autoTrain_progressText = "Auto Train Not Started."
let totalTrainings = 0;
let totalTrainings_text_a = 0;
let saveRequest = false;

// Training data for XOR
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

// This setup function runs when graphics are enabled
function gui_setup() {
  // Initialize canvas and create DOM elements
  createCanvas(windowWidth,windowHeight-50);
  num_sims_box = createInput('');
  auto_train_button = createButton('Set Auto Train Amount');
  auto_train_button.mousePressed(setAutoTrain);

  //The Neural Network itself
  nn = new NeuralNetwork(2, 2, 1, true);

  // FeedForward Button
  buttons.push(new Button(300,height-50,150,50,nn,training_data,"FeedForward","rgb(220,0,0)",0));
  // Train button
  buttons.push(new Button(-300,height-50,150,50,nn,training_data,"Train","rgb(0,0,220)",0));
  // Auto Train button
  buttons.push(new Button(0,height-50,300,50,autoTrain,null,"Auto Train (0 sims)","rgb(0,220,0)",autoTrainAmount));
  //Save Data button
  buttons.push(new Button(-525,height-50,150,50,enableSaveRequest,null,"Save Data","rgb(0,220,180)",0));
}

// Flag data to be saved
function enableSaveRequest() {
  if(!saveRequest) {
    saveRequest = true;
  }
}

// Runs at speed based upon frameRate and if graphics are enabled
function gui_draw() {
  // If data is flagged to be saved, save data and unflag
  if (saveRequest) {
    saveJSON(nn);
    saveRequest = false;
  }

  // Draw background and init drawing presets
  background(200)
  rectMode(CENTER);
  textSize(30)

  // Draw auto train text
  text(autoTrain_progressText,width/2,50);
  textSize(15);
  text("Total Trainings: " + totalTrainings_text_a,width/2,100);

  // Put (0,0) at center of screen and draw Neural Network and Buttons
  translate(windowWidth/2,0);
  nn.draw();
  buttons.map((button) => {
    button.draw();
  })
}

// Runs when mouse is clicked if graphics enabled
function gui_mouseClicked() {
  buttons.map((button) => {
    button.ins = [floor(random(0,2)),floor(random(0,2))]
    button.checkClick()
  })
}

// Runs auto training
function autoTrain() {
  // Get time at start of calculations
  let beginTime = millis();

  // Run training with random selections from training data
  for(let a = 0; a < floor(autoTrainAmount); a++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);
  }

  // Get time at end and calculate total time taken
  let endTime = millis();
  let totalTime = floor((endTime - beginTime)/1000);
  let time_text = totalTime + "secs";
  if(totalTime > 59) {
    let secs = totalTime % 60;
    let mins = floor(totalTime/60);
    let hours = 0;
    if(mins >= 60) {
      hours = floor(mins/60);
      mins = mins % 60;
    }
    time_text = hours + ":" + mins + ":" + secs
  }

  // Update auto training text
  autoTrain_progressText = "Auto Train Completed " + autoTrainAmount_text_a + " sims in ~" + time_text;

  // Increment training amount and display with commas
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
}

// Set the amount of auto trainings
function setAutoTrain() {
  // Gets the amount in the text box
  autoTrainAmount = parseInt(num_sims_box.value());

  // Updates auto button text with commas in number
  autoTrainAmount_text_a = autoTrainAmount.toString().split("");
  autoTrainAmount_text_a = autoTrainAmount_text_a.reverse();
  if(autoTrainAmount_text_a.length > 3) {
    for(let i = 3; i < autoTrainAmount_text_a.length; i += 4) {
      autoTrainAmount_text_a.splice(i,0,",");
    }
  }
  autoTrainAmount_text_a = autoTrainAmount_text_a.reverse();
  autoTrainAmount_text_a = autoTrainAmount_text_a.join("");
  buttons[2].text = "Auto Train ("  + autoTrainAmount_text_a + " sims)";
  buttons[2].autotrain_val = autoTrainAmount_text_a;
}
