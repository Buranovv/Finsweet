import { useContext } from "react";
import Slider from "react-slick";
import { PopularBlogsContext } from "../../context/PopularBlogsContext";
import Loader from "../shared/loader";
import CategoryCard from "../card/categoryCard";

const CategorySlider = () => {
  const { loading, categories } = useContext(PopularBlogsContext);

  let settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1370,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
          categories.map((ctgr, i) => <CategoryCard key={i} {...ctgr} />)
        )}
      </Slider>
    </div>
  );
};

export default CategorySlider;
