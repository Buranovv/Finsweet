import {
  COMMENT_FETCHING,
  COMMENT_LOADING,
  COMMENT_PAGE,
  COMMENT_SEARCH,
  COMMENT_TOTAL,
} from "../types/comment";

const initialState = {
  comments: [],
  total: 0,
  activePage: 1,
  loading: false,
  search: "",
};

const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMENT_LOADING:
      return { ...state, loading: payload };
    case COMMENT_FETCHING:
      return { ...state, comments: payload };
    case COMMENT_TOTAL:
      return { ...state, total: payload };
    case COMMENT_PAGE:
      return { ...state, activePage: payload };
    case COMMENT_SEARCH:
      return { ...state, search: payload };
  }

  return state;
};

export default commentReducer;
