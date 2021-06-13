var gCanvas;
var gCtx;

var gTimeoutWiggle;

function onInit() {
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  resetMeme();
  drawMeme();
  var imgs = getImgs();
  renderGallery(imgs);
  loadMemesFromLocal();
  renderSaved();
  openPage('gallery');
}

function openPage(page) {
  const pageSections = document.querySelectorAll('.page-section');
  pageSections.forEach((section) => {
    section.classList.add('hidden');
  });
  var currPage = '.gallery-cont';
  switch (page) {
    case 'editor':
      currPage = '.main-editor-cont';
      break;
    case 'saved':
      currPage = '.saved-gallery-cont';
      break;
  }
  document.querySelector(currPage).classList.remove('hidden');
  if (page === 'editor') focusOnTxtInput();
  stopWiggle();
}

function onSearchImgs(search) {
  const searchStr = search.toLowerCase();
  const filteredImgs = filterImgs(searchStr);
  renderGallery(filteredImgs);
}

// Bottom Editor buttons
function onSaveMeme() {
  saveMeme();
  wiggleSaveBtn();
  renderSaved();
}

function onDownloadMeme(elLink) {
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'myMeme';
}

// Saved Memes Gallery
function renderSaved() {
  const savedMemes = getSavedMemes();
  const elSavedGallery = document.querySelector('.saved-gallery');
  if (!savedMemes || !savedMemes.length) return (elSavedGallery.innerHTML = '<h2 class="saved-empty-text">You have no saved memes</h2>');
  var strHTML = '';
  savedMemes.forEach((meme, idx) => {
    strHTML += `<article data-imgId="${idx}" class="saved-meme">
                  <img src="${meme.dataUrl}" alt class="saved-img">
                  <button class="remove-saved-btn" onclick="onRemoveSaved(${idx})">Remove</button>
                  <button class="edit-saved-btn" onclick="onEditSaved(${idx})">Edit</button>
              </article>`;
  });
  document.querySelector('.saved-gallery').innerHTML = strHTML;
}

function onRemoveSaved(idx) {
  removeSaved(idx);
  drawMeme();
  renderSaved();
}

function onEditSaved(idx) {
  updatecurrMeme(idx);
  drawMeme();
  openPage('editor');
}

// Line buttons

function onSwitchLine() {
  switchLine();
  renderLineText();
  drawMeme();
  focusOnTxtInput();
  renderLineColors();
}

function onChangeFont(font) {
  changeFont(font);
  drawMeme();
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

function onChangeTextColor(color) {
  changeTextColor(color);
  drawMeme();
}

function onChangeFillColor(color) {
  changeFillColor(color);
  drawMeme();
}

function renderLineColors() {
  const colors = getLineColors();
  document.querySelector('.selectTextColor').value = colors.strokeColor;
  document.querySelector('.selectFillColor').value = colors.fillColor;
}

function renderGallery(imgs) {
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
  openPage('editor');
}

function drawMeme() {
  var memeImg = getImgURL();
  var img = new Image();
  img.src = memeImg;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawLines();
    const url = gCanvas.toDataURL('image/png');
    updateDataUrl(url);
  };
}

function drawLines() {
  const lines = getLines();
  lines.forEach((line, idx) => {
    selLineIdx = getSelLineIdx();
    var isFocus = selLineIdx === idx ? true : false;
    drawLine(line, isFocus);
  });
}

function drawLine(line, isFocus) {
  const text = line.txt.toUpperCase();
  gCtx.lineWidth = isFocus ? 3 : 2;
  gCtx.fillStyle = line.fillColor;
  gCtx.strokeStyle = line.strokeColor;
  gCtx.font = `${line.size}px ${line.font}`;
  gCtx.textAlign = line.align;
  gCtx.fillText(text, line.pos.x, line.pos.y);
  gCtx.strokeText(text, line.pos.x, line.pos.y);
}

function onTextChange(el) {
  if (!getLinesNum()) addLine();
  const text = el.value;
  const idx = getSelLineIdx();
  gMeme.lines[idx].txt = text;
  drawMeme();
}

function openSaved() {
  renderSaved();
  document.querySelector('.main-editor-cont').classList.add('hidden');
  document.querySelector('.gallery-cont').classList.add('hidden');
  document.querySelector('.saved-gallery-cont').classList.remove('hidden');
}

function toggleMenu() {
  document.body.classList.toggle('menuOpen');
  stopWiggle();
}

function wiggleSaveBtn() {
  var elSavedBtn = document.querySelector('.saved-btn');
  elSavedBtn.classList.add('wiggle');
  gTimeoutWiggle = setTimeout(function () {
    elSavedBtn.classList.remove('wiggle');
  }, 2000);
}

function stopWiggle() {
  clearTimeout(gTimeoutWiggle);
  var elSavedBtn = document.querySelector('.saved-btn');
  elSavedBtn.classList.remove('wiggle');
}

function _getCanvasSize() {
  const canvas = document.querySelector('.meme-canvas');
  return {
    height: canvas.height,
    width: canvas.width,
  };
}
