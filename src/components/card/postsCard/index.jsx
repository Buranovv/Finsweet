import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { IMG_URL } from "../../../constants";

import "./style.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PostsCard = ({
  _id,
  title,
  description,
  photo: { _id: photoId, name: photoName },
  category: { name },
}) => {
  let typeOfPhoto = photoName.split(".")[1];

  return (
    <Link to={`/${_id}`}>
      <div className="allPostsCard">
        <div className="allPostsCard__img-box">
          <LazyLoadImage
            effect="blur"
            src={`${IMG_URL}/${photoId ? photoId : ""}.${typeOfPhoto}`}
            alt=""
          />
        </div>
        <div className="allPostsCard__body">
          <p className="allPostsCard__ctgr">{name ? name : ""}</p>
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
  category: PropTypes.object,
};

export default PostsCard;
