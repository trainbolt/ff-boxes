const Box = require("./Box");
const boxSchema = require("./" + process.argv[2]);

function drawBoxes() {
  const boxes = new Box(boxSchema);
  boxes.GetCoords(0, 0);
  let chars = new Array(boxes.width);
  for (let i = 0; i < boxes.width; i++) {
    chars[i] = new Array(boxes.height);
  }

  chars = boxes.Draw(chars);

  let output = "";
  for (let i = 0; i < chars.length; i++) {
    if (!chars[i]) continue;

    for (let n = 0; n < chars[i].length; n++) {
      if (!chars[i][n]) output += " ";
      else output += chars[i][n];
    }
    output += "\n";
  }
  console.log(output);
}

drawBoxes();
