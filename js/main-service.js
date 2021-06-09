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

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy'] }];

function _loadFont() {
  document.querySelector('.canvas-cont').style.fontFamily = 'impact';
}

function getLine() {
  const idx = getLineIdx();
  return gMeme.lines[idx];
}

function getLineIdx() {
  return gMeme.selectedLineIdx;
}

function getMeme() {
  return gMeme;
}

function getImgURL() {
  var imgId = gMeme.selectedImgId;
  var img = gImgs.find((image) => {
    return image.id === imgId;
  });
  return img.url;
}

function drawCenterLine() {
  gCtx.strokeStyle = 'red';
  gCtx.moveTo(225, 20);
  gCtx.lineTo(225, 170);
  gCtx.stroke();
}
