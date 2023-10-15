import { Fragment, useEffect, useState } from "react";

import "./style.scss";
import request from "../../../server";
import PopularPostsSlider from "../../../components/carousel/PopularPostsSlider";
import CategorySlider from "../../../components/carousel/CategorySlider";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [latestPost, setLatestPost] = useState({});
  const [userName, setUserName] = useState("");
  const { title, description, createdAt, _id } = latestPost;

  useEffect(() => {
    const getLatestOne = async () => {
      try {
        const { data } = await request.get("post/lastone");

        setUserName(data.user.first_name + " " + data.user.last_name);

        setLatestPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    getLatestOne();
  }, []);

  let date = new Date(createdAt).toString().split(" ").slice(1, 4);

  return (
    <Fragment>
      <section className="hero">
        <div className="container">
          <div>
            <div className="hero__box">
              <p className="hero__posted">
                Posted on <span>Sturtup</span>
              </p>
              <h2 className="hero__title">{title}</h2>
              <div className="hero__content">
                <p className="hero__date">
                  By <span>{userName}</span> |{" "}
                  {`${date[0]} ${date[1]}, ${date[2]}`}
                </p>
                <p className="hero__description">{description}</p>
              </div>
            </div>
            <Link to={`/${_id}`} className="hero__btn">
              {"Read More >"}
            </Link>
          </div>
        </div>
      </section>
      <div className="container">
        <section className="popularBlogs">
          <h2 className="sectionTitle">Popular Blogs</h2>
          <PopularPostsSlider />
        </section>
        <section className="categories">
          <h2 className="sectionTitle">Choose A Category</h2>
          <CategorySlider />
        </section>
      </div>
    </Fragment>
  );
};

export default HomePage;
