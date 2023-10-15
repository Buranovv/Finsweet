import PropTypes from "prop-types";

import "./style.scss";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../../constants";

const PopularPostsCard = ({
  _id,
  title,
  description,
  createdAt,
  user: { first_name, last_name },
  photo: { _id: imgId },
}) => {
  let date = new Date(createdAt).toString().split(" ").slice(1, 4);

  return (
    <Link to={`/${_id}`}>
      <div className="postsCard">
        <div className="postsCard__img-box">
          <img
            className="postsCard__img"
            src={`${IMG_URL}/${imgId}.jpg`}
            alt=""
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
