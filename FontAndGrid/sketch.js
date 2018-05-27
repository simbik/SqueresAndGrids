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
  let testChar = new CharInField(field, CharInField.cross);
  testChar.apply(0,0);
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