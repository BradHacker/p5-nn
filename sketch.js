// Set to true if you want GUI
let graphic = false;
// Amount of trainings, only used in console mode
let trainingAmount = 100000;

// Run on load
function setup() {
  if(graphic) {
    // GUI mode setup
    gui_setup();
  } else {
    // Console mode setup
    console_setup(trainingAmount);
  }
}

// Draws GUI if graphics enabled
function draw() {
  if(graphic) {
    gui_draw();
  }
}

// Runs when mouse is clicked
function mouseClicked() {
  if(graphic) {
    gui_mouseClicked();
  }
}
