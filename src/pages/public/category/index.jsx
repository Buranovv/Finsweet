import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import useSingleData from "../../../hook/useSingleData";

import Loader from "../../../components/shared/loader";
import PostsCard from "../../../components/card/postsCard";
import { AllPostsContext } from "../../../context/AllPostsContext";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

const CategoryPage = () => {
  const { ctgrId } = useParams();

  const { data: category, loading: ctgrLoading } = useSingleData(
    "category",
    ctgrId
  );
  const { posts, loading, handleSearch, refetchData, hasMore } =
    useContext(AllPostsContext);

  const { name, description } = category;

  return (
    <section>
      <div className="category">
        <div className="container">
          {ctgrLoading ? (
            <Loader />
          ) : (
            <Fragment>
              <h2>{name}</h2>
              <p className="category__desc">{description}</p>
              <p className="category__path">{name ? `Blog > ${name}` : ""}</p>
            </Fragment>
          )}
        </div>
      </div>
      <div className="posts">
        <div className="container">
          <form className="posts__form" onSubmit={handleSearch}>
            <input type="text" id="name" placeholder="Searching ..." />
          </form>
          <div className="posts__box">
            <InfiniteScroll
              dataLength={posts.length}
              next={refetchData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {loading ? (
                <Loader />
              ) : (
                posts.map((post, i) =>
                  post.category.name === name ? (
                    <PostsCard key={i} {...post} />
                  ) : null
                )
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
