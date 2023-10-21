import { COMMENT_CONTROL } from "../types/comment";

const initialState = {
  comments: [],
  total: 0,
  activePage: 1,
  loading: false,
  search: "",
  isModalOpen: false,
  selected: null,
  isModalLoading: false,
};

const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMENT_CONTROL:
      return { ...state, ...payload };
  }

  return state;
};

export default commentReducer;
