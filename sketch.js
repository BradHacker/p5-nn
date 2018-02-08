let graphic = false;
let trainingAmount = 100000;

function setup() {
  if(graphic) {
    gui_setup();
  } else {
    console_setup(trainingAmount);
  }
}

function draw() {
  if(graphic) {
    gui_draw();
  }
}

function mouseClicked() {
  if(graphic) {
    gui_mouseClicked();
  }
}
