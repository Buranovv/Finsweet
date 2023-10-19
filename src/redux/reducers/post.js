import {
  POST_FETCHING,
  POST_LOADING,
  POST_PAGE,
  POST_SEARCH,
  POST_TOTAL,
} from "../types/post";

const initialState = {
  posts: [],
  total: 0,
  activePage: 1,
  loading: false,
  search: "",
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_LOADING:
      return { ...state, loading: payload };
    case POST_FETCHING:
      return { ...state, posts: payload };
    case POST_TOTAL:
      return { ...state, total: payload };
    case POST_PAGE:
      return { ...state, activePage: payload };
    case POST_SEARCH:
      return { ...state, search: payload };
  }

  return state;
};

export default postReducer;
