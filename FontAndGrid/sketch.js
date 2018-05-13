var field = {};
var from = {};
var to = {};
var cellSize = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  from = color(255, 255, 255); //color(68,238,235);;
  to = color(255, 255, 255); //color(255,34,68, 255);
  cellSize = 10;
  field = new Field(cellSize, 15, 15);
  var x = 5;
  var y = 5;
  field.cells[x][y] = new Cell(field, x, y, from, to, cellSize);
}

function draw() {
  background('#000000');
  noStroke();
  fill('0x10FF0000');
  ellipse(mouseX, mouseY, 10,10);
  for (var i = 0; i < field.cells.length; i++) {
    for (var j = 0; j < field.cells[i].length; j++) {
      var cell = field.cells[i][j];
      if (cell) {
        cell.update();
        fill("#AAAAAA");
        cell.draw();
      }
    }
  }
}

var cur = 1;

function mousePressed() {
  if (cur == 0) {
    createRectBreeding();
    cur++;
  } else {
    cur--;
    createTriangleBreeding();
  }
}

function createRectBreeding() {
  var il = this.field.cells.length;
  for (var i = 0; i < il; i++) {
    var jl = this.field.cells[i].length;
    for (var j = 0; j < jl; j++) {
      if (i > windowWidth / (2 * cellSize) - 40 && i < windowWidth / (2 * cellSize) + 40 && j > windowHeight / (2 * cellSize) - 40 && j < windowHeight / (2 * cellSize) + 40) {
        field.breedingGround[i][j] = 1;
      } else {
        field.breedingGround[i][j] = 0;
      }
    }
  }
  console.log("rect");
}

function createTriangleBreeding() {
  var il = this.field.breedingGround.length;
  for (var i = 0; i < il; i++) {
    var jl = this.field.breedingGround[i].length;
    for (var j = 0; j < jl; j++) {
      var down = j > windowHeight / (2 * cellSize) - 30;
      var left = j < -windowWidth / cellSize + windowHeight / (2 * cellSize) + 60 + 2 * i;
      var right = j < windowWidth / cellSize + windowHeight / (2 * cellSize) + 60 - 2 * i;
      if (down && left && right) {
        field.breedingGround[i][j] = 1;
      } else {
        field.breedingGround[i][j] = 0;
      }
    }
  }
  console.log("triangle");
}