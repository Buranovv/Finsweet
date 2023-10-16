import { useContext } from "react";
import { AllPostsContext } from "../../../context/AllPostsContext";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";
import Loader from "../../../components/shared/loader";
import PostsCard from "../../../components/card/postsCard";

const BlogPage = () => {
  const { posts, loading, handleSearch, refetchData, hasMore } =
    useContext(AllPostsContext);

  return (
    <div className="posts">
      <div className="container">
        <h2 className="sectionTitle">All posts</h2>
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
              posts.map((post, i) => <PostsCard key={i} {...post} />)
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
