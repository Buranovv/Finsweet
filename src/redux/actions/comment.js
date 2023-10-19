import { toast } from "react-toastify";
import request from "../../server";
import {
  COMMENT_FETCHING,
  COMMENT_LOADING,
  COMMENT_PAGE,
  COMMENT_SEARCH,
  COMMENT_TOTAL,
} from "../types/comment";
import { LIMIT_TABLE } from "../../constants";

export const getComment = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: COMMENT_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("comment", {
        params: { page, limit: LIMIT_TABLE, search },
      });
      dispatch({ type: COMMENT_FETCHING, payload: data });
      dispatch({ type: COMMENT_TOTAL, payload: total });
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      dispatch({ type: COMMENT_LOADING, payload: false });
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: COMMENT_PAGE, payload: page });
    dispatch(getComment(page));
  };
};

export const searchComment = (search) => {
  return (dispatch) => {
    dispatch({ type: COMMENT_SEARCH, payload: search });
    dispatch(getComment(1, search));
  };
};
