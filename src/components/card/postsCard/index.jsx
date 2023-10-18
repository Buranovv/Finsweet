import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { IMG_URL } from "../../../constants";

import "./style.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PostsCard = ({ _id, title, description, ctgrName, photoId }) => {
  const errorHandler = (error) => {
    error.target.src = "/icon.png";
  };

  return (
    <Link to={`/${_id}`}>
      <div className="allPostsCard">
        <div className="allPostsCard__img-box">
          <LazyLoadImage
            effect="blur"
            src={`${IMG_URL}/${photoId ? photoId : ""}.${"jpg" || "png"}`}
            alt=""
            onError={errorHandler}
          />
        </div>
        <div className="allPostsCard__body">
          <p className="allPostsCard__ctgr">{ctgrName ? ctgrName : ""}</p>
          <h5 className="allPostsCard__title">{title}</h5>
          <p className="allPostsCard__desc">{description}</p>
        </div>
      </div>
    </Link>
  );
};

PostsCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  photoName: PropTypes.string,
  photoId: PropTypes.string,
  ctgrName: PropTypes.string,
};

export default PostsCard;
