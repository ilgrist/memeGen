var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [],
};

var gImgs = [
  { id: 1, url: 'img/memeImgs/1.jpg', keywords: ['happy'] },
  { id: 2, url: 'img/memeImgs/2.jpg', keywords: ['scared'] },
  { id: 3, url: 'img/memeImgs/3.jpg', keywords: ['scared'] },
  { id: 4, url: 'img/memeImgs/4.jpg', keywords: ['scared'] },
  { id: 5, url: 'img/memeImgs/5.jpg', keywords: ['scared'] },
  { id: 6, url: 'img/memeImgs/6.jpg', keywords: ['scared'] },
  { id: 7, url: 'img/memeImgs/7.jpg', keywords: ['scared'] },
  { id: 8, url: 'img/memeImgs/8.jpg', keywords: ['scared'] },
  { id: 9, url: 'img/memeImgs/9.jpg', keywords: ['scared'] },
  { id: 10, url: 'img/memeImgs/10.jpg', keywords: ['scared'] },
  { id: 11, url: 'img/memeImgs/11.jpg', keywords: ['scared'] },
  { id: 12, url: 'img/memeImgs/12.jpg', keywords: ['scared'] },
  { id: 13, url: 'img/memeImgs/13.jpg', keywords: ['scared'] },
  { id: 14, url: 'img/memeImgs/14.jpg', keywords: ['scared'] },
  { id: 15, url: 'img/memeImgs/15.jpg', keywords: ['scared'] },
  { id: 16, url: 'img/memeImgs/16.jpg', keywords: ['scared'] },
  { id: 17, url: 'img/memeImgs/17.jpg', keywords: ['scared'] },
  { id: 18, url: 'img/memeImgs/18.jpg', keywords: ['scared'] },
];

var gTextSizeMod = 2;
var gLineXMod = 2;

function addLine() {
  var posY = getNewLinePosY();
  var newLine = _createLine(posY);
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function getNewLinePosY() {
  var posY = 50;
  const linesNum = getLinesNum();
  if (linesNum === 1) return (posY = 400);
  if (linesNum > 1) {
    var lines = [];
    lines = getLines();
    lines.sort((lineA, lineB) => lineA.pos.y - lineB.pos.y);
    var maxDiff = -Infinity;
    var targLineY = lines[0].pos.y;
    for (i = 0; i < lines.length - 1; i++) {
      var currLineY = lines[i].pos.y;
      var nextLineY = lines[i + 1].pos.y;
      var diff = Math.abs(currLineY - nextLineY);
      if (diff > maxDiff) {
        maxDiff = diff;
        targLineY = currLineY;
      }
    }
    posY = targLineY + Math.floor(maxDiff / 2);
  }
  return posY;
}

function removeLine(idx) {
  gMeme.lines.splice(idx, 1);
}

function alignText(direction) {
  const idx = getSelLineIdx();
  gMeme.lines[idx].align = direction;
}

// TODO maybe remove
function getLinesNum() {
  return gMeme.lines.length;
}

function _createLine(posY) {
  return {
    txt: 'Add text here',
    size: 40,
    align: 'center',
    color: 'white',
    pos: {
      x: 225,
      y: posY,
    },
  };
}

function getImgs() {
  return gImgs;
}

function switchLine() {
  var idx = getSelLineIdx();
  const linesNum = getLinesNum();
  idx = idx === linesNum - 1 ? 0 : ++idx;
  gMeme.selectedLineIdx = idx;
}

function updateImgId(imgId) {
  gMeme.selectedImgId = imgId;
}

function updateFontSize(diff) {
  const idx = getSelLineIdx();
  gMeme.lines[idx].size += diff * gTextSizeMod;
}

function updateLineY(diff) {
  const idx = getSelLineIdx();
  gMeme.lines[idx].pos.y += diff * gLineXMod;
}

function loadFont() {
  document.querySelector('.canvas-cont').style.fontFamily = 'impact';
}

function getLines() {
  return gMeme.lines;
}

function getLine() {
  const idx = getSelLineIdx();
  return gMeme.lines[idx];
}

function getSelLineIdx() {
  return gMeme.selectedLineIdx;
}

function getMeme() {
  return gMeme;
}

function getImgURL() {
  var imgId = +gMeme.selectedImgId;
  var img = gImgs.find(({ id }) => id === imgId);
  return img.url;
}

function getLinePos() {
  const idx = getSelLineIdx();
  return gMeme.lines[idx].pos;
}

function getLineText() {
  const idx = getSelLineIdx();
  return gMeme.lines[idx].txt;
}
