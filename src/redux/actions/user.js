import { toast } from "react-toastify";
import request from "../../server";
import {
  USER_FETCHING,
  USER_LOADING,
  USER_PAGE,
  USER_SEARCH,
  USER_TOTAL,
} from "../types/user";
import { LIMIT_TABLE } from "../../constants";

export const getUser = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("user", {
        params: { page, limit: LIMIT_TABLE, search },
      });
      dispatch({ type: USER_FETCHING, payload: data });
      dispatch({ type: USER_TOTAL, payload: total });
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      dispatch({ type: USER_LOADING, payload: false });
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: USER_PAGE, payload: page });
    dispatch(getUser(page));
  };
};

export const searchUser = (search) => {
  return (dispatch) => {
    dispatch({ type: USER_SEARCH, payload: search });
    dispatch(getUser(1, search));
  };
};
