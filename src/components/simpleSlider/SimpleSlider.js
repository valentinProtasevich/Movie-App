import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = (props) => {
  const settings = {
    className: '',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: props.slides,
    slidesToScroll: props.slides
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