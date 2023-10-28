import InfiniteScroll from "react-infinite-scroll-component";

import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import request from "../../../server";
import { LIMIT } from "../../../constants";

import { Modal } from "antd";
import { useForm } from "react-hook-form";
import { PopularBlogsContext } from "../../../context/PopularBlogsContext";

import MyPostCard from "../../../components/card/myPostCard/MyPostCard";
import "./style.scss";
import Loader from "../../../components/shared/loader";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [callBack, setCallBack] = useState(false);
  const [photoLoad, setPhotoLoad] = useState(false);
  const [formLoad, setFormLoad] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState(null);

  const callback = useCallback(() => {
    setCallBack(!callBack);
  }, [callBack]);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
  });
  const { categories } = useContext(PopularBlogsContext);

  const openModal = () => {
    setOpen(true);
    reset({ title: "", category: "", description: "", photo: "" });
    setSelected(null);
  };
  const closeModal = () => setOpen(false);

  useEffect(() => {
    const getMyPosts = async () => {
      const {
        data: { data: data1, pagination },
      } = await request.get(
        `post/user?limit=${LIMIT}&${search ? `search=${search}` : ""}`
      );

      setPosts(data1);
      setPage(pagination.next);
      setTotal(pagination.total);
    };
    getMyPosts();
  }, [search, callback]);

  const refetchData = async () => {
    if (posts.length < total) {
      const {
        data: { data: data1, pagination },
      } = await request.get(
        `post/user?limit=${LIMIT}&page=${page}&${
          search ? `search=${search}` : ""
        }`
      );

      setPosts([...posts, ...data1]);
      setPage(pagination.next);
    } else {
      setHasMore(false);
    }
  };

  const submit = async (values) => {
    try {
      setLoader(true);
      setOpen(false);
      values.photo = photo;
      if (selected === null) {
        await request.post("post", values);
      } else {
        await request.put(`post/${selected}`, values);
      }
      callback();
    } finally {
      setLoader(false);
    }
  };

  const uploadPhoto = async (e) => {
    try {
      setPhotoLoad(true);
      let formData = new FormData();
      formData.append("file", e.target.files["0"]);
      const { data } = await request.post("upload", formData);
      setPhoto(data._id);
    } finally {
      setPhotoLoad(false);
    }
  };

  const deletePost = async (id) => {
    try {
      setLoader(true);
      await request.delete(`post/${id}`);
      callback();
    } finally {
      setLoader(false);
    }
  };
  const editPost = async (id) => {
    setSelected(id);
    setOpen(true);
    try {
      setFormLoad(true);
      let { data } = await request.get(`post/${id}`);
      const newData = {
        ...data,
        category: data?.category?._id,
      };
      reset(newData);
    } finally {
      setFormLoad(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="posts">
      <div className="container">
        <h2 className="sectionTitle">My posts</h2>
        <form className="posts__form">
          <input
            type="text"
            id="name"
            placeholder="Searching ..."
            onChange={handleSearch}
          />
          <button type="button" onClick={openModal}>
            Add post
          </button>
        </form>
        <div className="posts__box">
          <InfiniteScroll
            dataLength={posts.length}
            next={refetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {loader ? (
              <Loader />
            ) : (
              posts.map((post, i) => (
                <MyPostCard
                  key={i}
                  {...post}
                  deletePost={deletePost}
                  editPost={editPost}
                />
              ))
            )}
          </InfiniteScroll>
        </div>

        <Modal
          open={open}
          title="Add post"
          onOk={handleSubmit(submit)}
          onCancel={closeModal}
          okText={`${selected === null ? "Add" : "Save"} post`}
        >
          {formLoad ? (
            <Loader />
          ) : (
            <form className={`form ${photoLoad ? "form-disabled" : ""}`}>
              <div>
                <input
                  style={{
                    border: `1px solid ${errors.title ? "red" : ""}`,
                  }}
                  type="text"
                  placeholder="Title"
                  {...register("title", {
                    required: "This field must not be empty!",
                  })}
                />
                {errors.title ? <p>{errors.title?.message}</p> : null}
              </div>
              <div>
                <select
                  style={{
                    border: `1px solid ${errors.category ? "red" : ""}`,
                  }}
                  {...register("category", {
                    required: "This field must not be empty!",
                  })}
                >
                  <option></option>
                  {categories.map((ctgr, i) => (
                    <option key={i} value={ctgr._id}>
                      {ctgr.name}
                    </option>
                  ))}
                </select>
                {errors.category ? <p>{errors.category?.message}</p> : null}
              </div>
              <div>
                <input
                  style={{
                    border: `1px solid ${errors.description ? "red" : ""}`,
                  }}
                  type="text"
                  placeholder="Description"
                  {...register("description", {
                    required: "This field must not be empty!",
                  })}
                />
                {errors.description ? (
                  <p>{errors.description?.message}</p>
                ) : null}
              </div>
              <div>
                {selected === null ? (
                  <Fragment>
                    <label htmlFor="image" className="photo__label">
                      Photo
                    </label>
                    <input
                      style={{
                        display: "none",
                      }}
                      onChange={uploadPhoto}
                      id="image"
                      type="file"
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <label htmlFor="image" className="photo__label">
                      Photo
                    </label>
                    <input
                      style={{
                        display: "none",
                      }}
                      {...register("photo", {
                        required: "This field must not be empty!",
                      })}
                      onChange={uploadPhoto}
                      id="image"
                      type="file"
                    />
                    {errors.photo ? <p>{errors.photo?.message}</p> : null}
                  </Fragment>
                )}
              </div>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyPostsPage;
