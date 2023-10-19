import { toast } from "react-toastify";
import request from "../../server";
import {
  CATEGORY_FETCHING,
  CATEGORY_LOADING,
  CATEGORY_PAGE,
  CATEGORY_SEARCH,
  CATEGORY_TOTAL,
} from "../types/category";
import { LIMIT_CTGR } from "../../constants";

export const getCategory = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("category", {
        params: { page, limit: LIMIT_CTGR, search },
      });
      dispatch({ type: CATEGORY_FETCHING, payload: data });
      dispatch({ type: CATEGORY_TOTAL, payload: total });
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      dispatch({ type: CATEGORY_LOADING, payload: false });
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_PAGE, payload: page });
    dispatch(getCategory(page));
  };
};

export const searchCategory = (search) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_SEARCH, payload: search });
    dispatch(getCategory(1, search));
  };
};
