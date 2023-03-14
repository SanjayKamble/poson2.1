// import SimpleImageSlider from "react-simple-image-slider";
import Image from "next/image";
// function Slider(){
//     const images = [
//         { url: './img/slider-img.png' },
//         { url: './img/slider-img.png' },
//         { url: './img/slider-img.png'}
//     ];
//     return(
//         <div>
//             <SimpleImageSlider width={500}
//         height={300} images={images} showBullets={true} loop={true} autoPlay={false} />
//         </div>
//     )
// }
// export default Slider;

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
}
function SimpleSlider(){
    
    return(
        <Slider {...settings}>
            <div>
                <Image src="/img/slider-img.png" alt="dashboard image" className="w-full" width={500} height={500}/>
            </div>
        </Slider>
    )
}
export default SimpleSlider;