import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { IMG_URL } from "../../../constants";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "./style.scss";

const MyPostCard = ({
  _id,
  title,
  description,
  photo: { _id: photoId, name: photoName },
  category: { name: ctgrName },
  deletePost,
  editPost,
}) => {
  let typeOfPhoto = photoName.split(".")[1];

  return (
    <div className="allPostsCard">
      <div className="allPostsCard__img-box">
        <LazyLoadImage
          effect="blur"
          src={`${IMG_URL}/${photoId ? photoId : ""}.${typeOfPhoto}`}
          alt=""
        />
      </div>
      <div className="allPostsCard__body">
        <p className="allPostsCard__ctgr">{ctgrName ? ctgrName : ""}</p>
        <Link to={`/${_id}`}>
          <h5 className="allPostsCard__title">{title}</h5>
        </Link>
        <p className="allPostsCard__desc">{description}</p>
        <div>
          <button onClick={() => deletePost(_id)} className="delete">
            Delete
          </button>
          <button onClick={() => editPost(_id)} className="edit">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

MyPostCard.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.object,
  category: PropTypes.object,
  deletePost: PropTypes.func,
  editPost: PropTypes.func,
};

export default MyPostCard;
