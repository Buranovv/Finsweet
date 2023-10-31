import { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/shared/loader";
import { getUserImg } from "../../utils";
import dayjs from "dayjs";
import request from "../../server";
import AccountForm from "./AccountForm";

import "../public/auth/style.scss";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Upload } from "antd";

const AccountPage = () => {
  const navigate = useNavigate();
  const [infoTab, setInfoTab] = useState(true);
  const [settingsTab, setISettings] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoLoad, setPhotoLoad] = useState(false);
  const [formLoad, setFormLoad] = useState(false);

  const { logout, getUser, user, loading } = useContext(AuthContext);
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    const newUser = {
      ...user,
      birthday: dayjs(user?.birthday).toISOString().substring(0, 10),
    };
    reset(newUser);
    setPhoto(user?.photo);
  }, [reset, user]);

  const openInfo = () => {
    setInfoTab(true);
    setISettings(false);
  };
  const openSettings = () => {
    setInfoTab(false);
    setISettings(true);
  };

  const save = async (values) => {
    try {
      setFormLoad(true);
      values.birthday = new Date(values?.birthday).toISOString();
      await request.put("auth/details", values);
      getUser();
      toast.success("Changes saved!");
    } finally {
      setFormLoad(false);
    }
  };

  const uploadPhoto = async (e) => {
    try {
      setPhotoLoad(true);
      let formData = new FormData();
      formData.append("file", e.target.files["0"]);
      await request.post("auth/upload", formData);
      getUser();
    } finally {
      setPhotoLoad(false);
    }
  };

  return (
    <section className="account">
      <div className="container">
        <div className="account__tabs">
          <div
            className={`account__tab ${infoTab ? "tab-active" : ""}`}
            onClick={openInfo}
          >
            User info
          </div>
          <div
            className={`account__tab ${settingsTab ? "tab-active" : ""}`}
            onClick={openSettings}
          >
            Settings
          </div>
        </div>
        <div className={`form-box ${infoTab ? "show" : "close"}`}>
          <form
            className={`form ${formLoad ? "form-disabled" : ""}`}
            onSubmit={handleSubmit(save)}
          >
            <div className="account__img-box">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                onChange={uploadPhoto}
                showUploadList={false}
              >
                <div>
                  {photoLoad ? (
                    <LoadingOutlined />
                  ) : photo ? (
                    <LazyLoadImage
                      src={getUserImg(photo)}
                      effect="blur"
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div>upload</div>
                    </div>
                  )}
                </div>
              </Upload>

              {/* <label htmlFor="img" className="account__img">
                {photo ? (
                  <LazyLoadImage
                    effect="blur"
                    style={{ width: "100%", height: "100%" }}
                    src={getUserImg(photo)}
                  />
                ) : (
                  <Fragment>
                    {photoLoad ? <LoadingOutlined /> : <AiOutlineUpload />}
                    <span>Upload</span>
                  </Fragment>
                )}
              </label>
              <input
                className="img-input"
                type="file"
                id="img"
                onChange={uploadPhoto}
              /> */}
            </div>
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="account__input-box">
                  <div>
                    <input
                      style={{
                        border: `1px solid ${errors.first_name ? "red" : ""}`,
                      }}
                      type="text"
                      placeholder="Firstname"
                      {...register("first_name", {
                        required: "This field must not be empty!",
                      })}
                    />
                    {errors.first_name ? (
                      <p>{errors.first_name?.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <input
                      style={{
                        border: `1px solid ${errors.last_name ? "red" : ""}`,
                      }}
                      type="text"
                      placeholder="Lastname"
                      {...register("last_name", {
                        required: "This field must not be empty!",
                      })}
                    />
                    {errors.last_name ? (
                      <p>{errors.last_name?.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <input
                      type="text"
                      style={{
                        border: `1px solid ${errors.username ? "red" : ""}`,
                      }}
                      placeholder="Username"
                      {...register("username", {
                        required: "This field must not be empty!",
                      })}
                    />
                    {errors.username ? <p>{errors.username?.message}</p> : null}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Phone number"
                      {...register("phoneNumber")}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Address"
                      {...register("address")}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      placeholder="Birthday"
                      {...register("birthday")}
                    />
                  </div>
                  <button type="submit" disabled={formLoad}>
                    Save
                  </button>
                </div>
              </Fragment>
            )}
          </form>
        </div>
        <div className={settingsTab ? "show" : "close"}>
          <AccountForm />

          <div className="logout-box">
            <button className="logout-btn" onClick={() => logout(navigate)}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
