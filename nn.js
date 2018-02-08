function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

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

  feedForward(input_array) {
    if(this.graphic) {
      this.fillVals(input_array,this.input_node_list);
      this.ins = input_array;
    }

    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    //add bias
    hidden.add(this.bias_h);
    //activation function
    hidden.map(sigmoid);

    if(this.graphic) {
      this.fillVals(hidden.toArray(),this.hidden_node_list);
    }

    //generating final output
    let output = Matrix.multiply(this.weights_ho, hidden);
    //add bias
    output.add(this.bias_o);
    output.map(sigmoid);

    if(this.graphic) {
      this.fillVals(output.toArray(),this.output_node_list);
      this.outputs = output.toArray();
    }
    //sending back output
    return output.toArray();
  }

  train(input_array, target_array) {
    //console.log(inputs)
    if(this.graphic) {
      this.fillVals(input_array,this.input_node_list);
      this.ins = input_array;
    }

    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weights_ih, inputs);
    //add bias
    hidden.add(this.bias_h);
    //activation function
    hidden.map(sigmoid);

    if(this.graphic) {
      this.fillVals(hidden.toArray(),this.hidden_node_list);
    }

    //generating final output
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    //add bias
    outputs.add(this.bias_o);
    outputs.map(sigmoid);
    //outputs.print();

    if(this.graphic) {
      this.fillVals(outputs.toArray(),this.output_node_list);
      this.outputs = outputs.toArray();
    }


    //convert array to matrix
    //outputs = Matrix.fromArray(outputs);
    //outputs.print();
    let targets = Matrix.fromArray(target_array);
    //calculate output errors
    let output_errors = Matrix.subtract(targets, outputs);
    // console.log('Output Errors')
    //output_errors.print()

    //Calculate gradient
    let gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(output_errors);
    gradients.multiply(this.learning_constant);


    //Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);


    //Adjust weights with deltas
    this.weights_ho.add(weight_ho_deltas);
    //Adjust bias with gradients
    this.bias_o.add(gradients);
    //this.weights_ho.print();


    //calculate hidden layer error
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);
    //hidden_errors.print();

    let hidden_gradient = Matrix.map(hidden, dsigmoid);
    //hidden_gradient.print();
    hidden_gradient.multiply(hidden_errors);
    hidden_gradient.multiply(this.learning_constant);

    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);

    //Adjust weights with deltas
    this.weights_ih.add(weight_ih_deltas);
    //Adjust bias with gradient
    this.bias_h.add(hidden_gradient);

    //this.gradientDescent(hidden_errors,this.weights_ih,this.bias_h);
    //this.gradientDescent(output_errors,this.weights_ho,this.bias_o);
  }

  //My Gradient descent from scratch
  // gradientDescent(errors, weights, bias) {
  //   let sums = [];
  //   for (let i = 0; i < weights.rows; i++) {
  //     let sum = 0;
  //     for (let j = 0; j < weights.cols; j++) {
  //       sum += Math.abs(weights.data[i][j]);
  //     }
  //     sum += bias.data[i][0];
  //     sums.push(sum);
  //   }
  //   //console.log(sums);
  //   for (let i = 0; i < weights.rows; i++) {
  //     let sum = sums[i]
  //     //console.log(errors.data[i][0])
  //     for (let j = 0; j < weights.cols; j++) {
  //       let percent_error = weights.data[i][j] / sum;
  //       let nudge_val = percent_error * errors.data[i][0] * this.learning_constant;
  //       weights.data[i][j] += nudge_val;
  //     }
  //   }
  // }

  draw() {
    //console.log(this.ih_connections.length)
    textSize(12);
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

  fillVals(vals,node_array) {
    for(let i = 0; i < node_array.length; i++) {
      node_array[i].value = vals[i];
    }
    this.ih_connections.map((con) => {
      con.value = this.weights_ih.data[con.i][con.j]
    })
    this.ho_connections.map((con) => {
      con.value = this.weights_ho.data[con.i][con.j]
    })
    this.draw();
  }
}
