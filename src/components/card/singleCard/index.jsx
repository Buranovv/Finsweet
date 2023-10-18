import PropTypes from "prop-types";

import { IMG_URL } from "../../../constants";
import "./style.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SingleCard = ({
  title,
  description,
  photoId,
  ctgrName,
  createdAt,
  first_name,
  last_name,
  ownerPhoto,
}) => {
  let date = new Date(createdAt).toString().split(" ").slice(1, 4);

  return (
    <div className="singleCard">
      <div className="singleCard__img-box">
        <LazyLoadImage
          className="singleImg"
          effect="blur"
          src={`${IMG_URL}${photoId}.${
            first_name === "Zahiriddin" ? "png" : "jpg"
          }`}
          alt=""
        />
      </div>
      <div className="singleCard__body">
        <div className="singleCard__body-box">
          <div className="singleCard__owner">
            <LazyLoadImage
              effect="blur"
              src={`${IMG_URL}${ownerPhoto}`}
              alt=""
            />
            <div className="singleCard__owner-content">
              <h6>{first_name + " " + last_name}</h6>
              <p>Posted on {`${date[1]} ${date[0]} ${date[2]}`}</p>
            </div>
          </div>
          <div className="singleCard__content">
            <h5 className="singleCard__title">{title}</h5>
            <p className="singleCard__ctgr">{ctgrName}</p>
            <p className="singleCard__desc">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

SingleCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  createdAt: PropTypes.string,
  photoId: PropTypes.string,
  ctgrName: PropTypes.string,
  last_name: PropTypes.string,
  first_name: PropTypes.string,
  ownerPhoto: PropTypes.string,
};

export default SingleCard;
