import request from "../../server";
import { USER_CONTROL } from "../types/user";
import { LIMIT_TABLE } from "../../constants";

export const updateState = (payload) => ({
  type: USER_CONTROL,
  payload,
});

export const getUser =
  (page = 1, search = "") =>
  async (dispatch) => {
    try {
      dispatch(updateState({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("user", {
        params: { page, limit: LIMIT_TABLE, search },
      });
      let users = data.map((el) => ({ ...el, key: el._id }));
      dispatch(updateState({ users, total }));
    } finally {
      dispatch(updateState({ loading: false }));
    }
  };

export const changePage = (page, search) => (dispatch) => {
  dispatch(updateState({ activePage: page }));
  dispatch(getUser(page, search));
};

export const searchUser = (search) => (dispatch) => {
  dispatch(updateState({ search }));
  dispatch(getUser(1, search));
};

export const controlModal = (payload) => (dispatch) => {
  dispatch(updateState({ isModalOpen: payload }));
};

// export const uploadPhoto = (file) => async (dispatch) => {
//   try {
//     dispatch(updateState({ photoLoad: true }));
//     let formData = new FormData();
//     formData.append("file", file);
//     const { data } = await request.post("auth/upload", formData);
//     console.log(data);
//     dispatch(updateState({ photoData: data }));
//   } finally {
//     dispatch(updateState({ photoLoad: false }));
//   }
// };

export const sendUser =
  ({ values, selected, activePage, search }) =>
  async (dispatch) => {
    try {
      dispatch(updateState({ isModalLoading: true }));
      selected === null
        ? await request.post("user", values)
        : await request.put(`user/${selected}`, values);
      dispatch(updateState({ isModalOpen: false }));
      dispatch(getUser(activePage, search));
    } finally {
      dispatch(updateState({ isModalLoading: false }));
    }
  };

export const editUser = (form, id) => async (dispatch) => {
  try {
    dispatch(
      updateState({
        selected: id,
        isModalOpen: true,
        photoLoad: true,
        isModalLoading: true,
      })
    );
    const { data } = await request.get(`user/${id}`);
    dispatch(updateState({ photoData: data.photo }));
    form.setFieldsValue(data);
  } finally {
    dispatch(updateState({ photoLoad: false, isModalLoading: false }));
  }
};

export const deleteUser = (id, search) => async (dispatch) => {
  await request.delete(`user/${id}`);
  dispatch(getUser(1, search));
  dispatch(updateState({ activePage: 1 }));
};
