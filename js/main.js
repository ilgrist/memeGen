var gCanvas;
var gCtx;

function onInit() {
  console.log('init!');
  gCanvas = document.querySelector('canvas');
  gCtx = gCanvas.getContext('2d');
  drawMemeImg();
}

function onCanvasClick(ev) {}

function drawMemeImg() {
  var memeImg = _getCurrImgURL();
  var img = new Image();
  img.src = memeImg;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
  };
}
