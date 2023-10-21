import request from "../../server";
import { CATEGORY_CONTROL } from "../types/category";
import { LIMIT_CTGR } from "../../constants";

export const updateState = (payload) => ({
  type: CATEGORY_CONTROL,
  payload,
});

export const getCategory =
  (page = 1, search = "") =>
  async (dispatch) => {
    try {
      dispatch(updateState({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("category", {
        params: { page, limit: LIMIT_CTGR, search },
      });
      let categories = data.map((el) => ({ ...el, key: el._id }));
      dispatch(updateState({ categories, total }));
    } finally {
      dispatch(updateState({ loading: false }));
    }
  };

export const changePage = (page, search) => (dispatch) => {
  dispatch(updateState({ activePage: page }));
  dispatch(getCategory(page, search));
};

export const searchCategory = (search) => (dispatch) => {
  dispatch(updateState({ search }));
  dispatch(getCategory(1, search));
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

export const sendCategory =
  ({ values, selected, activePage, search }) =>
  async (dispatch) => {
    try {
      dispatch(updateState({ isModalLoading: true }));
      selected === null
        ? await request.post("category", values)
        : await request.put(`category/${selected}`, values);
      dispatch(updateState({ isModalOpen: false }));
      dispatch(getCategory(activePage, search));
    } finally {
      dispatch(updateState({ isModalLoading: false }));
    }
  };

export const editCategory = (form, id) => async (dispatch) => {
  try {
    dispatch(
      updateState({
        selected: id,
        isModalOpen: true,
        photoLoad: true,
        isModalLoading: true,
      })
    );
    const { data } = await request.get(`category/${id}`);
    dispatch(updateState({ photoData: data.photo }));
    form.setFieldsValue(data);
  } finally {
    dispatch(updateState({ photoLoad: false, isModalLoading: false }));
  }
};

export const deleteCategory = (id, search) => async (dispatch) => {
  await request.delete(`category/${id}`);
  dispatch(getCategory(1, search));
  dispatch(updateState({ activePage: 1 }));
};
