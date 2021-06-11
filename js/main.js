var gCanvas;
var gCtx;

function onInit() {
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  loadFont();
  drawMeme();
  renderImgs();
}

function onSwitchLine() {
  switchLine();
  renderLineText();
  drawMeme();
  focusOnTxtInput();
}

function onAlignText(direction) {
  const canvasSize = _getCanvasSize();
  alignText(direction, +canvasSize.width);
  drawMeme();
}

function onChangeFontSize(diff) {
  updateFontSize(diff);
  drawMeme();
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
  drawMeme();
  clearTxtInput();
  focusOnTxtInput();
}

function focusOnTxtInput() {
  document.querySelector('.memeLineInput').focus();
}

function onChangeLineY(diff) {
  updateLineY(diff);
  drawMeme();
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
  drawMeme();
  openEditor();
}

function drawMeme() {
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
  const text = line.txt.toUpperCase();
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
  drawMeme();
}

function onRemoveLine() {
  const idx = getSelLineIdx();
  removeLine(idx);
  drawMeme();
  clearTxtInput();
  focusOnTxtInput();
}
function onOpenMemes() {
  console.log('opening memes (currently missing)');
}
function openEditor() {
  console.log('opening editor');
  document.querySelector('.gallery-cont').classList.add('hidden');
  document.querySelector('.main-editor-cont').classList.remove('hidden');
}

function openGallery() {
  console.log('opening gallery');
  document.querySelector('.main-editor-cont').classList.add('hidden');
  document.querySelector('.gallery-cont').classList.remove('hidden');
}

function toggleMenu() {
  document.body.classList.toggle('menuOpen');
}

function _getCanvasSize() {
  const canvas = document.querySelector('.meme-canvas');
  return {
    height: canvas.height,
    width: canvas.width,
  };
}
function onCanvasClick(ev) {}
