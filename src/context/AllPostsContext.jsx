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
  const [photoName, setPhotoName] = useState(null);
  const [photoId, setPhotoId] = useState(null);
  const [ctgrName, setCtgrName] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    try {
      const getAllPosts = async () => {
        const {
          data: { data: data1, pagination },
        } = await request.get(
          `post?limit=${LIMIT}&${search ? `search=${search}` : ""}`
        );

        setPhotoId(data1.photo?._id);
        setPhotoName(data1?.photo?.name);
        setCtgrName(data1.category?.name);
        setPosts(data1);
        setPage(pagination.next);
        setTotal(pagination.total);
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

  const state = {
    posts,
    setSearch,
    refetchData,
    hasMore,
    handleSearch,
    photoName,
    photoId,
    ctgrName,
  };
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
