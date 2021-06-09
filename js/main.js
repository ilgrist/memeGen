var gCanvas;
var gCtx;
var gLine = 0;

function onInit() {
  console.log('init!');
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  drawImg();
  _loadFont();
}

function onCanvasClick(ev) {}

function drawImg() {
  var memeImg = getImgURL();
  var img = new Image();
  img.src = memeImg;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawLine();
  };
}

function drawLine() {
  //   drawCenterLine();
  const line = getLine();
  const text = line.txt;
  gCtx.lineWidth = 2;
  gCtx.fillStyle = line.color;
  gCtx.font = `${line.size}px ` + 'impact';
  gCtx.textAlign = line.align;
  const x = 225;
  const y = 50;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function onLineChange(el) {
  var text = el.value;
  gMeme.lines[gLine].txt = text;
  drawImg();
}

function renderCanvas() {
  gCtx.save();
  gCtx.fillStyle = '#ede5ff';
  gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
  renderCircle();
  gCtx.restore();
}
