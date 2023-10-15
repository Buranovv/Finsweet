import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { IMG_URL } from "../../../constants";

import "./style.scss";

const PostsCard = ({
  _id,
  title,
  description,
  photo: { _id: photoId },
  category: { name },
}) => {
  return (
    <Link to={`/${_id}`}>
      <div className="allPostsCard">
        <div className="allPostsCard__img-box">
          <img src={`${IMG_URL}/${photoId ? photoId : ""}.jpg`} alt="" />
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
