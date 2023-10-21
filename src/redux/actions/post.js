import request from "../../server";
import { POST_CONTROL } from "../types/post";
import { LIMIT_TABLE } from "../../constants";

export const updateState = (payload) => ({
  type: POST_CONTROL,
  payload,
});

export const getPost =
  (page = 1, search = "") =>
  async (dispatch) => {
    try {
      dispatch(updateState({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("post", {
        params: { page, limit: LIMIT_TABLE, search },
      });
      let posts = data.map((el) => ({ ...el, key: el._id }));
      dispatch(updateState({ posts, total }));
    } finally {
      dispatch(updateState({ loading: false }));
    }
  };

export const changePage = (page, search) => (dispatch) => {
  dispatch(updateState({ activePage: page }));
  dispatch(getPost(page, search));
};

export const searchPost = (search) => (dispatch) => {
  dispatch(updateState({ search }));
  dispatch(getPost(1, search));
};

export const controlModal = (payload) => (dispatch) => {
  dispatch(updateState({ isModalOpen: payload }));
};

export const uploadPhoto = (file) => async (dispatch) => {
  try {
    dispatch(updateState({ photoLoad: true }));
    let formData = new FormData();
    formData.append("file", file);
    const { data } = await request.post("upload", formData);
    dispatch(updateState({ photoData: data }));
  } finally {
    dispatch(updateState({ photoLoad: false }));
  }
};

export const sendPost =
  ({ values, selected, activePage, search }) =>
  async (dispatch) => {
    try {
      dispatch(updateState({ isModalLoading: true }));
      selected === null
        ? await request.post("post", values)
        : await request.put(`post/${selected}`, values);
      dispatch(updateState({ isModalOpen: false }));
      dispatch(getPost(activePage, search));
    } finally {
      dispatch(updateState({ isModalLoading: false }));
    }
  };

export const editPost = (form, id) => async (dispatch) => {
  try {
    dispatch(
      updateState({
        selected: id,
        isModalOpen: true,
        photoLoad: true,
        isModalLoading: true,
      })
    );
    const { data } = await request.get(`post/${id}`);
    dispatch(updateState({ photoData: data.photo }));
    form.setFieldsValue({ ...data, category: data.category._id });
  } finally {
    dispatch(updateState({ photoLoad: false, isModalLoading: false }));
  }
};

export const deletePost = (id, search) => async (dispatch) => {
  await request.delete(`post/${id}`);
  dispatch(getPost(1, search));
  dispatch(updateState({ activePage: 1 }));
};
