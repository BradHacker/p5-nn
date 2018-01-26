function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
  constructor(numI, numH, numO) {
    this.input_nodes = numI;
    this.hidden_nodes = numH;
    this.output_nodes = numO;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes,1);
    this.bias_o = new Matrix(this.output_nodes,1);
    this.bias_h.randomize();
    this.bias_o.randomize();
  }

  feedForward(input_array) {
    console.log('feeding forward')
    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    //add bias
    hidden.add(this.bias_h);
    //activation function
    hidden.map(sigmoid);

    //generating final output
    let output = Matrix.multiply(this.weights_ho, hidden);
    //add bias
    output.add(this.bias_o);
    output.map(sigmoid);

    //sending back output
    return output.toArray();
  }

  train(inputs, targets) {
    let outputs = this.feedForward(inputs);

    //convert array to matrix
    outputs = Matrix.fromArray(outputs);
    targets = Matrix.fromArray(targets);

    let output_errors = Matrix.subtract(targets, outputs);

    let who_t = Matrix.transpose(this.weights_ho);

    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // outputs.print()
    // targets.print()
    // error.print()
  }
}
