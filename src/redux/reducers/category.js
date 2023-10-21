import { CATEGORY_CONTROL } from "../types/category";

const initialState = {
  categories: [],
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

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_CONTROL:
      return { ...state, ...payload };
  }

  return state;
};

export default categoryReducer;
