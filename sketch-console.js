function console_setup(ta) {
  // Define amount of training and the trianing data
  let trainAmount = ta;
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
  ];
  // Define Neural Network
  let nn = new NeuralNetwork(2, 2, 1, false);

  // Run training with training data
  for(let i = 0; i < trainAmount; i++) {
    let data = random(training_data);
    nn.train(data.inputs,data.targets);
  }

  // Log Neural Network output to respective values
  console.log(nn.feedForward([1,0]));
  console.log(nn.feedForward([0,1]));
  console.log(nn.feedForward([0,0]));
  console.log(nn.feedForward([1,1]));
}
