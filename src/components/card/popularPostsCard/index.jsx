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
  photoId: imgId,
  photoName,
}) => {
  let date = new Date(createdAt).toString().split(" ").slice(1, 4);
  console.log(photoName);

  const errorHandler = (error) => {
    error.target.src = "/icon.png";
  };

  return (
    <Link to={`/${_id}`}>
      <div className="postsCard">
        <div className="postsCard__img-box">
          <LazyLoadImage
            effect="blur"
            className="postsCard__img"
            src={`${IMG_URL}/${imgId}.${"jpg" || "png"}`}
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
  photoName: PropTypes.string,
  photoId: PropTypes.string,
};

export default PopularPostsCard;
