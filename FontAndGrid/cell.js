class Cell {
    constructor(localField, initX, initY, from, to, cellSize) {
        this.cellSize = cellSize;
        this.from = from;
        this.to = to;
        this.notDraw = true;
        this.livingSpace = 8;
        this.livingCicle = 0;
        this.maxCicle = 40;
        this.field = localField;
        this.x = initX;
        this.y = initY;
    }
    update() {
       // if (!this.notDraw) {
            this.livingCicle++;
            var emptyCells = this.field.getEmptyAround(this.x, this.y);
            var m = 0;
            if (field.breedingGround[this.x][this.y] == 1) {
                m = 5;
            }
            
            //grow
            if (emptyCells.length >= this.livingSpace - field.breedingGround[this.x][this.y]) {
                var place = floor(random(0, emptyCells.length));
                this.grow(emptyCells[place][0], emptyCells[place][1]);
            } else {
                //die
                this.field.cells[this.x][this.y] = null;
                this.notDraw = true;
            }
            
            /*if (this.livingCicle >= this.maxCicle) {
                
            }*/
        //}
    }
    //add new cell to the position
    grow(x, y) {
        this.field.cells[x][y] = new Cell(this.field, x, y, this.from, this.to, this.cellSize);
    }
    draw() {
        //if (!this.notDraw) {
            fill(lerpColor(from, to, 1 / this.livingCicle));
            rect(this.x*this.cellSize, this.y*this.cellSize, this.cellSize, this.cellSize);
        /*}
        else {
            this.notDraw = false;
        }*/
    }
}
  

  
