# p5.js Neural Network

## Table of Contents
* [Introduction](#introduction)
* [Running The Code](#running-the-code)
* [Switching Versions](#switching-versions)
  * [For Console](#for-console)
  * [For GUI](#for-gui)
* [Console Version](#console-version)
* [GUI Version](#gui-version)
  * [Save/Upload Networks](#saveupload-networks)
  * [Auto Training](#auto-training)

## Introduction
This is a library I have created for a *single layered* neural network. This was created with the help of [The Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw). I have devised this network into two separate parts. The console version which is purely the library and the GUI version which I have developed overtop of the console version. The code when freshly downloaded will default to **console mode**.

## Running the Code
Running the code is as simple as opening your favorite web-browser (must have javascript enabled, I prefer Google Chrome) and inputing the file path to the `index.html` file in the root folder of this repository.

In google chrome the url should look something like this:
```
file:///path/to/repository/parent/folder/p5-nn/index.html
```

## Switching Versions

To switch between the graphic or non-graphic version you must edit the [`sketch.js`](sketch.js) file. You must change the variable on line one of the file.

#### For Console
```Javascript
let graphic = false;
```
#### For GUI
```Javascript
let graphic = true;
```

### Console Version
This version displays nothing on the web page and you can only interact with through the console. In order to see the neural network object itself we could write...
```Javascript
console.log(nn);
```
Which would log the neural network object to the console.

By default, when it loads, the neural network will output it's guesses on the following inputs: [1,0], [0,1], [0,0], [1,1]. This would look something like this:
```
[0.9909727135668843]
[0.9909752945011339]
[0.011020323834196615]
[0.008903402390524211]
```

### GUI Version
The GUI version of this library allows for a more user friendly interface with the neural network. This GUI is still a WIP so keep an eye out for updates.

#### Save/Upload Networks
The GUI allows you to save the current data from the neural network in the form of a JSON file. You can then upload that network later in order to restore the previous training.

#### Auto Training
In order to auto train, you must first set the amount of training. Enter the preferred amount of training and click the button to set the amount of auto trainings (WARNING: More than 100,000 simulations may take a long time!!!).

## Changelog
### v0.1.0 - 02.08.2018
* Added Changelog
* Added TOC
* Updated GUI section of README

## Credits
* Bradley Harker - Main Programmer
* Daniel Shiffman - Tutorials on Neural Network Concepts
* David Speaks - Pre-Calculus teacher who helped with Math
* Elijah Wilson - Introduced project and co-designer
