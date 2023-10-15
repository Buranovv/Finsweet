import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import request from "../server";
import { LIMIT } from "../constants";

export const AllPostsContext = createContext();

const AllPostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    try {
      const getAllPosts = async () => {
        const {
          data: { data: data1, pagination },
        } = await request.get(
          `post?limit=${LIMIT}&${search ? `search=${search}` : ""}`
        );

        setPosts(data1);
        setPage(pagination.next);
        setTotal(pagination.total);
        console.log(data1);
      };
      getAllPosts();
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  const refetchData = async () => {
    if (posts.length < total) {
      try {
        const {
          data: { data: data1, pagination },
        } = await request.get(
          `post?limit=${LIMIT}&page=${page}&${search ? `search=${search}` : ""}`
        );

        setPosts([...posts, ...data1]);
        setPage(pagination.next);
      } catch (error) {
        console.log(error);
      }
    } else {
      setHasMore(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.name.value.toLowerCase());
  };

  const state = { posts, setSearch, refetchData, hasMore, handleSearch };
  return (
    <AllPostsContext.Provider value={state}>
      {children}
    </AllPostsContext.Provider>
  );
};

AllPostsContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AllPostsContextProvider;
