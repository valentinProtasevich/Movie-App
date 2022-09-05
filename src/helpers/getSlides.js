const getSlides = () => {
  if (window.screen.width < 768) {
    return 1
  } else if (window.screen.width < 1024) {
    return 4
  } else {
    return 5
  }
}

export default getSlides;