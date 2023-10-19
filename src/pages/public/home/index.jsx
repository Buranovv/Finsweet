import { Fragment, useEffect, useState } from "react";

import "./style.scss";
import request from "../../../server";
import PopularPostsSlider from "../../../components/carousel/PopularPostsSlider";
import CategorySlider from "../../../components/carousel/CategorySlider";
import { Link } from "react-router-dom";
import Loader from "../../../components/shared/loader";
import { toast } from "react-toastify";

const HomePage = () => {
  const [latestPost, setLatestPost] = useState({});
  const [userName, setUserName] = useState("");
  const { title, description, createdAt, _id } = latestPost;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLatestOne = async () => {
      try {
        setLoading(true);
        const { data } = await request.get("post/lastone");
        setUserName(data.user.first_name + " " + data.user.last_name);
        setLatestPost(data);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
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
            {loading ? (
              <Loader className="hero__loader" />
            ) : (
              <Fragment>
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
                    <p className="hero__description">{description?.slice(0, 200)}...</p>
                  </div>
                </div>
                <Link to={`/${_id}`} className="hero__btn">
                  {"Read More >"}
                </Link>
              </Fragment>
            )}
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
