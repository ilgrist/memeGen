var gCanvas;
var gCtx;
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Fly, you fools!',
      size: 40,
      align: 'center',
      color: 'white',
    },
  ],
};

function onInit() {
  console.log('init!');
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  drawMemeImg();
  _loadFont();
}

function onCanvasClick(ev) {}

function drawMemeImg() {
  var memeImg = _getImgURL();
  var img = new Image();
  img.src = memeImg;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  };
}

function drawLine(lineIdx) {
  //   drawCenterLine();
  const line = _getMemeLine(lineIdx);
  const text = line.txt;
  gCtx.lineWidth = 2;
  gCtx.fillStyle = line.color;
  //   gCtx.font = '40px impact';
  gCtx.font = `${line.size}px ` + 'impact';
  gCtx.textAlign = line.align;
  const x = 225;
  const y = 50;
  gCtx.fillText(text, x, y);
  gCtx.strokeText(text, x, y);
}

function _getMeme() {
  return gMeme;
}

function _getImgURL() {
  var imgId = gMeme.selectedImgId;
  var img = gImgs.find((image) => {
    return image.id === imgId;
  });
  return img.url;
}

function _getMemeLine(lineIdx) {
  return gMeme.lines[lineIdx];
}

function drawCenterLine() {
  gCtx.strokeStyle = 'red';
  gCtx.moveTo(225, 20);
  gCtx.lineTo(225, 170);
  gCtx.stroke();
}
