import PropTypes from "prop-types";

import "./style.scss";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../../constants";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PopularPostsCard = ({
  _id,
  title,
  description,
  createdAt,
  user: { first_name, last_name },
  photo,
}) => {
  let date = new Date(createdAt).toString().split(" ").slice(1, 4);

  const errorHandler = (error) => {
    error.target.src = "/icon.png";
  };

  const photoType = photo?.name?.split(".")[1];
  const photoId = photo?._id;
  const photo2 = `${photoId}.${photoType}`;

  return (
    <Link to={`/${_id}`}>
      <div className="postsCard">
        <div className="postsCard__img-box">
          <LazyLoadImage
            effect="blur"
            className="postsCard__img"
            src={`${IMG_URL}${photo2}`}
            alt=""
            onError={errorHandler}
          />
        </div>
        <div className="postsCard__body">
          <p className="postsCard__date">
            By <span>{first_name + " " + last_name}</span> |{" "}
            {`${date[0]} ${date[1]}, ${date[2]}`}
          </p>
          <h5 className="postsCard__title">{title}</h5>
          <p className="postsCard__description">{description}</p>
        </div>
      </div>
    </Link>
  );
};

PopularPostsCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  user: PropTypes.object,
  photo: PropTypes.object,
};

export default PopularPostsCard;
