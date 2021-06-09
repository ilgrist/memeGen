var gCanvas;
var gCtx;
var gLine = 0;

function onInit() {
  console.log('init!');
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  drawImg();
  _loadFont();
  renderImgs();
}

function onSwitchLine() {
  switchLine();
  drawImg();
}

function onChangeFontSize(diff) {
  updateFontSize(diff);
  drawImg();
}

function onChangeLineY(diff) {
  updateLineY(diff);
  drawImg();
}

function renderImgs() {
  var imgs = getImgs();
  var strHTML = '';
  imgs.map((img) => {
    strHTML += `<article data-imgId="${img.id}" class="meme" onclick="onMemeClicked(this)">
                <img src="${img.url}" alt class="meme-img">
            </article>`;
  });
  document.querySelector('.img-gallery').innerHTML = strHTML;
}
function onMemeClicked(el) {
  var memeId = el.dataset.imgid;
  updateImgId(memeId);
  drawImg();
}

function drawImg() {
  var memeImg = getImgURL();
  var img = new Image();
  img.src = memeImg;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawLine();
  };
}

function drawLines() {
  const lines = getLines();
  lines.map((line) => {
    var pos = line.pos;
    drawLine(line, pos);
  });
}

function drawLine(line, pos) {
  const text = line.txt;
  gCtx.lineWidth = 2;
  gCtx.fillStyle = line.color;
  gCtx.font = `${line.size}px ` + 'impact';
  gCtx.textAlign = line.align;
  gCtx.fillText(text, pos.x, pos.y);
  gCtx.strokeText(text, pos.x, pos.y);
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
