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

    this.learning_constant = 0.5;

    this.input_node_list = [];
    this.hidden_node_list = [];
    this.output_node_list = [];

    this.ih_connections = [];
    this.ho_connections = [];

    for(let i = 0; i < this.input_nodes; i++) {
      this.input_node_list.push(new Node(-1,i,this.input_nodes))
    }
    for(let i = 0; i < this.hidden_nodes; i++) {
      this.hidden_node_list.push(new Node(0,i,this.hidden_nodes))
    }
    for(let i = 0; i < this.output_nodes; i++) {
      this.output_node_list.push(new Node(1,i,this.output_nodes))
    }

    for(let i = 0; i < this.hidden_node_list.length; i++) {
      for(let j = 0; j < this.input_node_list.length; j++) {
        this.ih_connections.push(new Connection(this.hidden_node_list[i].x,this.hidden_node_list[i].y,this.input_node_list[j].x,this.input_node_list[j].y,this.weights_ih.data[i][j]));
      }
    }
    for(let i = 0; i < this.output_node_list.length; i++) {
      for(let j = 0; j < this.hidden_node_list.length; j++) {
        this.ho_connections.push(new Connection(this.output_node_list[i].x,this.output_node_list[i].y,this.hidden_node_list[j].x,this.hidden_node_list[j].y,this.weights_ho.data[i][j]));
      }
    }
  }

  feedForward(input_array) {
    this.fillVals(input_array,this.input_node_list);

    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    //add bias
    hidden.add(this.bias_h);
    //activation function
    hidden.map(sigmoid);

    this.fillVals(hidden.toArray(),this.hidden_node_list);

    //generating final output
    let output = Matrix.multiply(this.weights_ho, hidden);
    //add bias
    output.add(this.bias_o);
    output.map(sigmoid);

    this.fillVals(output.toArray(),this.output_node_list);

    //sending back output
    return output.toArray();
  }

  train(inputs, targets) {
    let outputs = this.feedForward(inputs);

    //convert array to matrix
    outputs = Matrix.fromArray(outputs);
    targets = Matrix.fromArray(targets);
    //calculate output erros
    let output_errors = Matrix.subtract(targets, outputs);
    //calculate hidden layer error
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // this.weights_ho.print();
    this.gradientDescent(hidden_errors,this.weights_ih,this.bias_h);
    this.gradientDescent(output_errors,this.weights_ho,this.bias_o);
    // this.weights_ho.print();
    // console.log("targets")
    // targets.print()
    // console.log("inputs")
    // Matrix.fromArray(inputs).print()
    // console.log("outputs")
    // outputs.print()
    // console.log("output error")
    // output_errors.print()
    // console.log("hidden error")
    // hidden_errors.print()
  }

  gradientDescent(errors, weights, bias) {
    let sums = [];
    for (let i = 0; i < weights.rows; i++) {
      let sum = 0;
      for (let j = 0; j < weights.cols; j++) {
        sum += Math.abs(weights.data[i][j]);
      }
      sum += bias.data[i][0];
      sums.push(sum);
    }
    // console.log(sums);
    for (let i = 0; i < weights.rows; i++) {
      let sum = sums[i]
      for (let j = 0; j < weights.cols; j++) {
        let percent_error = weights.data[i][j] / sum;
        let nudge_val = percent_error * errors.data[i][0] * this.learning_constant;
        weights.data[i][j] += nudge_val;
      }
    }
  }

  draw() {
    //console.log(this.ih_connections.length)
    for(let i = 0; i < this.ih_connections.length; i++) {
      let connection = this.ih_connections[i];
      //console.log(connection)
      connection.draw()
    }
    for(let i = 0; i < this.ho_connections.length; i++) {
      let connection = this.ho_connections[i];
      connection.draw()
    }

    for(let i = 0; i < this.input_node_list.length; i++) {
      let node = this.input_node_list[i];
      node.draw()
    }
    for(let i = 0; i < this.hidden_node_list.length; i++) {
      let node = this.hidden_node_list[i];
      node.draw()
    }
    for(let i = 0; i < this.output_node_list.length; i++) {
      let node = this.output_node_list[i];
      node.draw()
    }
  }

  fillVals(vals,node_array) {
    for(let i = 0; i < node_array.length; i++) {
      node_array[i].value = vals[i];
    }
    draw();
  }
}
