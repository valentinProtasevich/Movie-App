const getSlides = () => {
  if (window.screen.width < 768) {
    return 1
  } else {
    return 5
  }
}

export default getSlides;