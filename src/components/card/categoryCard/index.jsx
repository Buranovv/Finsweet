import PropTypes from "prop-types";

import "./style.scss";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CategoryCard = ({ name, description, _id, photo: { _id: photoId } }) => {
  return (
    <Link to={`/blog/${_id}`}>
      <div className="categoryCard">
        <LazyLoadImage
          effect="blur"
          className="categoryCard__img"
          src={`${IMG_URL}/${photoId}.jpg`}
          alt=""
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
