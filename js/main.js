var gCanvas;
var gCtx;

function onInit() {
  console.log('init!');
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  drawImg();
  loadFont();
  renderImgs();
}

function onSwitchLine() {
  switchLine();
  document.querySelector('.memeLineInput').value = '';
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
    drawLines();
  };
}

function drawLines() {
  const lines = getLines();
  lines.forEach((line, idx) => {
    selLineIdx = getSelLineIdx();
    var isFocus = selLineIdx === idx ? true : false;
    var pos = line.pos;
    drawLine(line, pos, isFocus);
  });
}

function drawLine(line, pos, isFocus) {
  const text = line.txt;
  gCtx.lineWidth = isFocus ? 3 : 2;
  gCtx.fillStyle = line.color;
  gCtx.font = `${line.size}px ` + 'impact';
  gCtx.textAlign = line.align;
  gCtx.fillText(text, pos.x, pos.y);
  gCtx.strokeText(text, pos.x, pos.y);
}

function onLineChange(el) {
  checkIfFirstLine();
  const text = el.value;
  const idx = getSelLineIdx();
  gMeme.lines[idx].txt = text;
  drawImg();
}

function onCanvasClick(ev) {}
