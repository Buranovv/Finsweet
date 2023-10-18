import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { IMG_URL } from "../../../constants";

import "./style.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PostsCard = ({ _id, title, description, ctgrName, photo }) => {
  const errorHandler = (error) => {
    error.target.src = "/icon.png";
  };

  const photoType = photo?.name?.split(".")[1];
  const photoId = photo?._id;
  const photo2 = `${photoId}.${photoType}`;

  return (
    <Link to={`/${_id}`}>
      <div className="allPostsCard">
        <div className="allPostsCard__img-box">
          <LazyLoadImage
            effect="blur"
            src={`${IMG_URL}${photo2}`}
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
  photo: PropTypes.object,
  ctgrName: PropTypes.string,
};

export default PostsCard;
