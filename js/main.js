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
  renderLineText();
  drawImg();
  focusOnTxtInput();
}

function onChangeFontSize(diff) {
  updateFontSize(diff);
  drawImg();
}

function renderLineText() {
  const text = getLineText();
  renderInput(text);
}

function clearTxtInput() {
  document.querySelector('.memeLineInput').value = '';
}

function renderInput(val) {
  document.querySelector('.memeLineInput').value = val;
}

function onAddLine() {
  addLine();
  drawImg();
  clearTxtInput();
  focusOnTxtInput();
}

function focusOnTxtInput() {
  document.querySelector('.memeLineInput').focus();
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

function onTextChange(el) {
  if (!getLinesNum()) addLine();
  const text = el.value;
  const idx = getSelLineIdx();
  gMeme.lines[idx].txt = text;
  drawImg();
}

function onOpenMemes() {
  console.log('opening memes (currently missing)');
}
function onOpenEditor() {
  console.log('opening editor');
  document.querySelector('.img-gallery').classList.add('hidden');
  document.querySelector('.main-editor-cont').classList.remove('hidden');
}

function onOpenGallery() {
  console.log('opening gallery');
  document.querySelector('.main-editor-cont').classList.add('hidden');
  document.querySelector('.img-gallery').classList.remove('hidden');
}

function onCanvasClick(ev) {}
