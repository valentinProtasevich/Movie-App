const createDefaultImg = (element) => {
  let image = document.createElement('div');
  image.className = 'defaultImg';
  element.after(image);
};

export default createDefaultImg;