import { Fragment, useEffect, useState } from "react";

import "./style.scss";
import request from "../../../server";

const HomePage = () => {
  const [latestPost, setLatestPost] = useState({});
  const [userName, setUserName] = useState("");
  const { title, description, createdAt } = latestPost;

  useEffect(() => {
    const getLatestOne = async () => {
      try {
        const { data } = await request.get("post/lastone");

        setUserName(data.user.first_name+ " " + data.user.last_name);

        setLatestPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    getLatestOne();
  }, []);

  let date = new Date(createdAt).toString().split(" ").slice(1, 4).join(" ");

  return (
    <Fragment>
      <section className="hero">
        <div className="container">
          <div>
            <div className="hero__box">
              <p className="hero__posted">
                Posted on <span>Sturtup</span>
              </p>
              <h2 className="hero__title">
                {title} dgdfbdfbdf dfbdfbd dgdfrhdhdrfh dfdffgsgsf
              </h2>
              <div className="hero__content">
                <p className="hero__date">
                  By <span>{userName}</span> | {date}
                </p>
                <p className="hero__description">{description}</p>
              </div>
            </div>
            <button className="hero__btn">{"Read More >"}</button>
          </div>
        </div>
      </section>
      <div className="container"></div>
    </Fragment>
  );
};

export default HomePage;
