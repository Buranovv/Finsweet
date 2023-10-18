import PropTypes from "prop-types";
import { useEffect, useState, createContext } from "react";
import request from "../server";

export const PopularBlogsContext = createContext();

const PopularBlogsContextProvider = ({ children }) => {
  const [popPosts, setPopPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [photoId, setPhotoId] = useState(null);
  const [photoName, setPhotoName] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        let { data } = await request.get("post/lastones");
        let {
          data: { data: categories },
        } = await request.get("category");

        setPhotoName(data?.photo?.name);
        setPhotoId(data.photo?._id);
        setPopPosts(data);
        setCategories(categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const state = { popPosts, loading, categories, photoId, photoName };
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
