import { POST_CONTROL } from "../types/post";

const initialState = {
  posts: [],
  total: 0,
  activePage: 1,
  loading: false,
  search: "",
  isModalOpen: false,
  selected: null,
  isModalLoading: false,
  photoLoad: false,
  photoData: null,
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_CONTROL:
      return { ...state, ...payload };
  }

  return state;
};

export default postReducer;
