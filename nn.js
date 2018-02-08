// The sigmoid function
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

// The derivative of the sigmoid
function dsigmoid(y) {
  return y * (1 - y);
}

class NeuralNetwork {
  constructor(numI, numH, numO, graphic) {
    this.graphic = graphic;

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

    this.learning_constant = 0.1;

    // If graphics enabled, create all display objects
    if(this.graphic) {
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
          this.ih_connections.push(new Connection(this.hidden_node_list[i].x,this.hidden_node_list[i].y,this.input_node_list[j].x,this.input_node_list[j].y,this.weights_ih.data[i][j],i,j));
        }
      }
      for(let i = 0; i < this.output_node_list.length; i++) {
        for(let j = 0; j < this.hidden_node_list.length; j++) {
          this.ho_connections.push(new Connection(this.output_node_list[i].x,this.output_node_list[i].y,this.hidden_node_list[j].x,this.hidden_node_list[j].y,this.weights_ho.data[i][j],i,j));
        }
      }
    }
  }

  // This function generates its guess based upon inputs
  feedForward(input_array) {
    // If grpahics enabled, fill input node display values
    if(this.graphic) {
      this.fillVals(input_array,this.input_node_list);
      this.ins = input_array;
    }

    // Convert input_array to Matrix
    let inputs = Matrix.fromArray(input_array);

    // Generate hidden layer values
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    // Add bias
    hidden.add(this.bias_h);
    // Apply activation function
    hidden.map(sigmoid);

    // If graphics enabled, fill hidden node display values
    if(this.graphic) {
      this.fillVals(hidden.toArray(),this.hidden_node_list);
    }

    // Generating final output
    let output = Matrix.multiply(this.weights_ho, hidden);
    //Add bias
    output.add(this.bias_o);
    // Apply activation function
    output.map(sigmoid);

    // If graphics enabled, fill output node display values
    if(this.graphic) {
      this.fillVals(output.toArray(),this.output_node_list);
      this.outputs = output.toArray();
    }

    // Returning output as an Array
    return output.toArray();
  }

  // This function modifies the weights and bias based upon the expected output using gradient descent
  train(input_array, target_array) {
    // If grpahics enabled, fill input node display values
    if(this.graphic) {
      this.fillVals(input_array,this.input_node_list);
      this.ins = input_array;
    }

    // Convert input_array to Matrix
    let inputs = Matrix.fromArray(input_array);

    // Generate hidden layer values
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    // Add bias
    hidden.add(this.bias_h);
    // Apply activation function
    hidden.map(sigmoid);

    // If graphics enabled, fill hidden node display values
    if(this.graphic) {
      this.fillVals(hidden.toArray(),this.hidden_node_list);
    }

    // Generating final output
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    // Add bias
    outputs.add(this.bias_o);
    // Apply activation function
    outputs.map(sigmoid);

    // If graphics enabled, fill output node display values
    if(this.graphic) {
      this.fillVals(outputs.toArray(),this.output_node_list);
      this.outputs = outputs.toArray();
    }

    // Convert array to matrix
    let targets = Matrix.fromArray(target_array);
    // Calculate output errors
    let output_errors = Matrix.subtract(targets, outputs);

    // Calculate gradient
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_constant);

    // Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

    // Adjust weights with deltas
    this.weights_ho.add(weight_ho_deltas);
    // Adjust bias with gradients
    this.bias_o.add(gradients);

    // Calculate hidden layer error
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_constant);

    // Calculate deltas
    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

    // Adjust weights with deltas
    this.weights_ih.add(weight_ih_deltas);
    // Adjust bias with gradient
    this.bias_h.add(hidden_gradient);
  }

  // Display the Neural Network
  draw() {
    textSize(12);

    // Draw all connections between nodes
    for(let i = 0; i < this.ih_connections.length; i++) {
      let connection = this.ih_connections[i];
      connection.draw()
    }
    for(let i = 0; i < this.ho_connections.length; i++) {
      let connection = this.ho_connections[i];
      connection.draw()
    }

    // Draw all nodes
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

    // If input values, then diplay them
    if(this.ins) {
      let input_message = "";
      for(let i = 0; i < this.ins.length; i++) {
        input_message += this.ins[i].toFixed(3);
        if(i !== this.ins.length - 1) {
          input_message += " , ";
        }
      }
      rectMode(CENTER);
      textSize(60/this.ins.length);
      text(input_message,width/8-width/2,height/2);
    }

    // If output values, then display them
    if(this.outputs) {
      let output_message = "";
      for(let i = 0; i < this.outputs.length; i++) {
        output_message += this.outputs[i].toFixed(3);
        if(i !== this.outputs.length - 1) {
          output_message += " , ";
        }
      }
      rectMode(CENTER);
      textSize(60/this.outputs.length);
      text(output_message,width/2-width/8,height/2);
    }
  }

  // Fill values in nodes and connections
  fillVals(vals,node_array) {
    // Set node values
    for(let i = 0; i < node_array.length; i++) {
      node_array[i].value = vals[i];
    }

    // Set connection values
    this.ih_connections.map((con) => {
      con.value = this.weights_ih.data[con.i][con.j]
    })
    this.ho_connections.map((con) => {
      con.value = this.weights_ho.data[con.i][con.j]
    })

    // Redraw the Neural Network
    this.draw();
  }
}
