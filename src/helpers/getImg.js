import noImg from '../resources/img/noImg.jpg'

const getImg = (imgUrl, alt) => {
  if (imgUrl) {
    return (
      <img src={`https://image.tmdb.org/t/p/w500/${imgUrl}`} alt = {alt}/>
    )
  } else {
    return (
      <img src={noImg} alt = {alt}/>
    )
  }
}

export default getImg;