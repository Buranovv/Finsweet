import request from "../../server";
import { COMMENT_CONTROL } from "../types/comment";
import { LIMIT_TABLE } from "../../constants";

export const updateState = (payload) => ({
  type: COMMENT_CONTROL,
  payload,
});

export const getComment =
  (page = 1, search = "") =>
  async (dispatch) => {
    try {
      dispatch(updateState({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("comment", {
        params: { page, limit: LIMIT_TABLE, search },
      });
      let comments = data.map((el) => ({ ...el, key: el._id }));
      dispatch(updateState({ comments, total }));
    } finally {
      dispatch(updateState({ loading: false }));
    }
  };

export const changePage = (page, search) => {
  return (dispatch) => {
    dispatch(updateState({ activePage: page }));
    dispatch(getComment(page, search));
  };
};

export const searchComment = (search) => {
  return (dispatch) => {
    dispatch(updateState({ search }));
    dispatch(getComment(1, search));
  };
};

export const controlModal = (payload) => (dispatch) => {
  dispatch(updateState({ isModalOpen: payload }));
};

export const sendComment =
  ({ values, selected, activePage, search }) =>
  async (dispatch) => {
    try {
      dispatch(updateState({ isModalLoading: true }));
      selected === null
        ? await request.post("comment", values)
        : await request.put(`comment/${selected}`, values);
      dispatch(updateState({ isModalOpen: false }));
      dispatch(getComment(activePage, search));
    } finally {
      dispatch(updateState({ isModalLoading: false }));
    }
  };

export const editComment = (form, id) => async (dispatch) => {
  try {
    dispatch(
      updateState({
        selected: id,
        isModalOpen: true,
        isModalLoading: true,
      })
    );
    const { data } = await request.get(`comment/${id}`);
    form.setFieldsValue(data);
  } finally {
    dispatch(updateState({ isModalLoading: false }));
  }
};

export const deleteComment = (id, search) => async (dispatch) => {
  await request.delete(`comment/${id}`);
  dispatch(getComment(1, search));
  dispatch(updateState({ activePage: 1 }));
};
