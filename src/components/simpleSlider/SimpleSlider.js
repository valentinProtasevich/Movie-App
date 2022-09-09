import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = (props) => {
  const settings = {
    className: '',
    dots: true,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    variableWidth: true
  };

  return (
    <>
      <h2>{props.title}</h2>
      <Slider {...settings}>
        {props.children}
      </Slider>  
    </>

  )
}

export default SimpleSlider;