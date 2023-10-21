import { USER_CONTROL } from "../types/user";

const initialState = {
  users: [],
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

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_CONTROL:
      return { ...state, ...payload };
  }

  return state;
};

export default userReducer;
