const MEMES_KEY = 'memes';
var gMeme;
var gSavedMemes;

var gImgs = [
  { id: 1, url: 'img/memeImgs/1.jpg', keywords: ['happy', 'puppy', 'dog', 'pet'] },
  { id: 2, url: 'img/memeImgs/2.jpg', keywords: ['happy', 'buzz', 'toy'] },
  { id: 3, url: 'img/memeImgs/3.jpg', keywords: ['baby', 'human', 'puppy', 'dog', 'pet'] },
  { id: 4, url: 'img/memeImgs/4.jpg', keywords: ['cat', 'pet'] },
  { id: 5, url: 'img/memeImgs/5.jpg', keywords: ['human', 'success', 'baby', 'excited'] },
  { id: 6, url: 'img/memeImgs/6.jpg', keywords: ['human', 'aliens'] },
  { id: 7, url: 'img/memeImgs/7.jpg', keywords: ['baby', 'human', 'excited'] },
  { id: 8, url: 'img/memeImgs/8.jpg', keywords: ['human', 'willy', 'wonka', 'gene'] },
  { id: 9, url: 'img/memeImgs/9.jpg', keywords: ['baby', 'human', 'success', 'laugh'] },
  { id: 10, url: 'img/memeImgs/10.jpg', keywords: ['human', 'barak', 'obama', 'laugh', 'president'] },
  { id: 11, url: 'img/memeImgs/11.jpg', keywords: ['fight', 'human', 'boxing'] },
  { id: 12, url: 'img/memeImgs/12.jpg', keywords: ['human'] },
  { id: 13, url: 'img/memeImgs/13.jpg', keywords: ['human', 'leonardo', 'dicaprio', 'great', 'gatsby'] },
  { id: 14, url: 'img/memeImgs/14.jpg', keywords: ['human', 'morpheus', 'matrix'] },
  { id: 15, url: 'img/memeImgs/15.jpg', keywords: ['human', 'mordor', 'lord', 'ring', 'boromir', 'one'] },
  { id: 16, url: 'img/memeImgs/16.jpg', keywords: ['human', 'laugh', 'star trek', 'pickard'] },
  { id: 17, url: 'img/memeImgs/17.jpg', keywords: ['human', 'putin', 'president'] },
  { id: 18, url: 'img/memeImgs/18.jpg', keywords: ['human', 'trump', 'president'] },
];

var gTextSizeMod = 2;
var gLineXMod = 2;

function addLine() {
  var posY = getNewLinePosY();
  var newLine = _createLine(posY);
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

// Saving memes
function saveMeme() {
  var memes = clone(gSavedMemes);
  if (!memes || !memes.length) memes = [];
  memes.push(gMeme);
  gSavedMemes = clone(memes);
  saveSavedMemes();
}

function loadMemesFromLocal() {
  gSavedMemes = loadFromStorage(MEMES_KEY);
}

function getSavedMemes() {
  return gSavedMemes;
}

function clone(el) {
  return JSON.parse(JSON.stringify(el));
}

function saveSavedMemes() {
  saveToStorage(MEMES_KEY, gSavedMemes);
}

function updateDataUrl(newUrl) {
  gMeme.dataUrl = newUrl;
}

function removeSaved(idx) {
  gSavedMemes.splice(idx, 1);
  if (!gSavedMemes || !gSavedMemes.length) resetMeme();
  saveSavedMemes();
}

function updatecurrMeme(idx) {
  gMeme = gSavedMemes[idx];
}

// Line editing
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
  gMeme.selectedLineIdx = 0;
}

function alignText(direction, canvasWidth) {
  var posX;
  const canvasWidthUnit = Math.floor(canvasWidth / 20);
  switch (direction) {
    case 'left':
      posX = canvasWidthUnit;
      break;
    case 'center':
      posX = Math.floor(canvasWidth / 2);
      break;
    case 'right':
      posX = canvasWidth - canvasWidthUnit;
      break;

    default:
      break;
  }
  const idx = getSelLineIdx();
  gMeme.lines[idx].align = direction;
  gMeme.lines[idx].pos.x = posX;
}

function getLinesNum() {
  return gMeme.lines.length;
}

function _createLine(posY) {
  return {
    txt: 'Add text here',
    size: 40,
    align: 'center',
    strokeColor: '#000000',
    fillColor: '#ffffff',
    font: 'Impact',
    pos: {
      x: 225,
      y: posY,
    },
  };
}

function changeTextColor(color) {
  var idx = getSelLineIdx();
  gMeme.lines[idx].strokeColor = color;
}
function changeFillColor(color) {
  console.log('color:', color);
  var idx = getSelLineIdx();
  gMeme.lines[idx].fillColor = color;
}

function changeFont(newFont) {
  const idx = getSelLineIdx();
  gMeme.lines[idx].font = newFont;
}

function switchLine() {
  var idx = getSelLineIdx();
  const linesNum = getLinesNum();
  idx = idx === linesNum - 1 ? 0 : ++idx;
  gMeme.selectedLineIdx = idx;
}

function updateImgId(imgId) {
  gMeme.selectedImgId = +imgId;
}

function updateFontSize(diff) {
  const idx = getSelLineIdx();
  gMeme.lines[idx].size += diff * gTextSizeMod;
}

function updateLineY(diff) {
  const idx = getSelLineIdx();
  gMeme.lines[idx].pos.y += diff * gLineXMod;
}

function resetMeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    dataUrl: undefined,
    lines: [
      {
        txt: 'Add your text',
        size: 40,
        align: 'center',
        strokeColor: '#000000',
        fillColor: '#ffffff',
        font: 'Impact',
        pos: {
          x: 225,
          y: 50,
        },
      },
    ],
  };
}
// Get functions

function getImgs() {
  return gImgs;
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

function getLineColors() {
  const idx = getSelLineIdx();
  return {
    strokeColor: gMeme.lines[idx].strokeColor,
    fillColor: gMeme.lines[idx].fillColor,
  };
}

function getLineText() {
  const idx = getSelLineIdx();
  return gMeme.lines[idx].txt;
}

function filterImgs(searchStr) {
  const imgs = clone(gImgs);
  var filteredImgs = imgs.filter((img) => {
    var keyArr = img.keywords.filter((keyword) => {
      return keyword.toLowerCase().startsWith(searchStr);
    });
    if (keyArr.length) return true;
  });
  return filteredImgs;
}

//   { id: 1, url: 'img/memeImgs/1.jpg', keywords: ['happy'] },
