import { toast } from "react-toastify";
import request from "../../server";
import {
  POST_FETCHING,
  POST_LOADING,
  POST_PAGE,
  POST_SEARCH,
  POST_TOTAL,
} from "../types/post";
import { LIMIT_TABLE } from "../../constants";

export const getPost = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: POST_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("post", {
        params: { page, limit: LIMIT_TABLE, search },
      });
      dispatch({ type: POST_FETCHING, payload: data });
      dispatch({ type: POST_TOTAL, payload: total });
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      dispatch({ type: POST_LOADING, payload: false });
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: POST_PAGE, payload: page });
    dispatch(getPost(page));
  };
};

export const searchPost = (search) => {
  return (dispatch) => {
    dispatch({ type: POST_SEARCH, payload: search });
    dispatch(getPost(1, search));
  };
};
