import PropTypes from "prop-types";

import "./style.scss";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoryCard = ({ name, description, _id, photo }) => {
  const photoType = photo?.name?.split(".")[1];
  const photoId = photo?._id;
  const photo2 = `${photoId}.${photoType}`;

  const handleError = (error) => {
    error.target.src = "/icon.png";
  };

  return (
    <Link to={`/blog/${_id}`}>
      <div className="categoryCard">
        <LazyLoadImage
          effect="blur"
          className="categoryCard__img"
          src={`${IMG_URL}${photo2}`}
          alt=""
          onError={handleError}
        />
        <div className="categoryCard__body">
          <h5 className="categoryCard__title">{name}</h5>
          <p className="categoryCard__description">{description}</p>
        </div>
      </div>
    </Link>
  );
};

CategoryCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.object,
};

export default CategoryCard;
