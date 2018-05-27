class Field {
    constructor(cellSize, lengthX, lengthY) {
        this.width = lengthX;
        this.height = lengthY;
    this.cells = new Array(lengthX); 
    this.breedingGround = new Array(lengthX); 
    for (var i = 0; i < lengthX; i++) {
        this.cells[i] = new Array(lengthY);
        this.breedingGround[i] = new Array(lengthY);
    }
    this.setBreedingGroud(0);
    }

    setBreedingGroud(value) {
        var il = this.breedingGround.length;
     for (var i = 0; i < il; i++) {
        var jl = this.breedingGround[i].length;
        for (var j = 0; j < jl; j++) {
            this.breedingGround[i][j] = value;
        }
    }
    }

    clearBreedginGroud() {
        this.setBreedingGroud(0);
    }

    hasBreedingGroud(x, y) { return this.breedingGround[x][y] == 1; }

    isEmpty(x, y) { return !this.cells[x][y]; }
    getEmptyAround(x, y) { 
        var result = []; 
        let ly = y!=0 ? y-1 : y;
        let my = y!=this.height-1 ? y+1 : y;
        let lx = x!=0 ? x-1 : x;
        let mx = x!=this.width-1 ? x+1 : x;
        for (var i=lx; i<=mx; i++) {
            for (var j=ly; j<=my; j++) {
                if (this.isEmpty(i,j)) result.push([i,j]);
            }
        }
        return result;
    }
}
    