import PropTypes from "prop-types";
import { useEffect, useState, createContext } from "react";
import request from "../server";

export const PopularBlogsContext = createContext();

const PopularBlogsContextProvider = ({ children }) => {
  const [popPosts, setPopPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPopular = async () => {
      try {
        setLoading(true);
        let { data } = await request.get("post/lastones");
        let {
          data: { data: categories },
        } = await request.get("category");
        setPopPosts(data);
        setCategories(categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getPopular();
  }, []);

  const state = { popPosts, loading, categories };
  return (
    <PopularBlogsContext.Provider value={state}>
      {children}
    </PopularBlogsContext.Provider>
  );
};

PopularBlogsContextProvider.propTypes = {
  children: PropTypes.node,
};

export default PopularBlogsContextProvider;
