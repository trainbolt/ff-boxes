let instanceNumber = 1;
let chars = [];

module.exports = class Box {
  constructor(obj) {
    this.childBoxes = [];
    Object.assign(this, obj);
    obj.boxes.forEach((val, idx) => {
      this.childBoxes.push(new Box(val));
    });
    this.x = this.y = 0;
    this.width = this.height = 3;
    this.instanceNumber = instanceNumber++;
  }

  GetCoords(xOffset, yOffset) {
    this.x = xOffset;
    this.y = yOffset;
    let nextOffset = { x: this.x + 1, y: this.y + 1 };
    //console.log(`box ${this.instanceNumber} width before: ${this.width}`);
    for (let child in this.childBoxes) {
      let coords = this.childBoxes[child].GetCoords(
        nextOffset.x + 1,
        nextOffset.y + 1
      );
      this.width += coords.width + 1;
      this.height += coords.height + 1;
      //if (this.stack == "v") this.y += this.height + 1;
      //else this.x += this.width + 1;
    }
    //console.log(`box ${this.instanceNumber} x:${this.x} y:${this.y} w:${this.width} h:${this.height}`);
    //console.log(this);
    return { x: this.x, y: this.y, width: this.width, height: this.height };
  }

  Draw(chars) {
    if (!chars[this.x]) chars[this.x] = [];
    if (!chars[this.y]) chars[this.y] = [];

    // corners
    chars[this.x][this.y] = "+";
    chars[this.x][this.y + this.height - 1] = "+";
    chars[this.x + this.width - 1][this.y + this.height - 1] = "+";
    chars[this.x + this.width - 1][this.y] = "+";

    // top and bottom rows
    for (let x = this.x + 1; x < this.x + this.width - 1; x++) {
      //console.log(`box ${this.instanceNumber} fill ${this.y},${x} with -`);
      chars[this.y][x] = "-";
      let y = this.y + this.height - 1;
      //console.log(`box ${this.instanceNumber} fill ${y},${x} with -`);
      chars[this.y + this.height - 1][x] = "-";
    }

    for (let row = this.y + 1; row < this.y + this.height - 1; row++) {
      chars[row][this.x] = "|";
      //console.log(`box ${this.instanceNumber} fill ${row},${this.x} with |`);
      chars[row][this.x + this.width - 1] = "|";
      //console.log(`box ${this.instanceNumber} fill ${row},${this.x + this.width - 1} with |`);
    }

    for (let child in this.childBoxes) this.childBoxes[child].Draw(chars);

    return chars;
  }
};
