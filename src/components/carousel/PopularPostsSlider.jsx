import { useContext } from "react";
import Slider from "react-slick";
import PopularPostsCard from "../card/popularPostsCard";
import { PopularBlogsContext } from "../../context/PopularBlogsContext";
import Loader from "../shared/loader";

const PopularPostsSlider = () => {
  const { popPosts, loading } = useContext(PopularBlogsContext);

  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {loading ? (
          <Loader />
        ) : (
          popPosts.map((post, i) => <PopularPostsCard key={i} {...post} />)
        )}
      </Slider>
    </div>
  );
};

export default PopularPostsSlider;
