var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy'] }];
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I never eat Falafel',
      size: 20,
      align: 'left',
      color: 'red',
    },
  ],
};

function _getCurrMeme() {
  return gMeme;
}

function _getCurrImgURL() {
  var imgId = gMeme.selectedImgId;
  var img = gImgs.find((image) => {
    return image.id === imgId;
  });
  return img.url;
}
