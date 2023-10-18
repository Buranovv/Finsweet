import { useForm } from "react-hook-form";

import request from "../../../../server";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { ROLE, TOKEN } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import "../style.scss";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm({
    mode: "onTouched",
  });

  const { setIsAuth, setRole } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const user = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      password: data.password,
    };
    try {
      const {
        data: { token, role },
      } = await request.post(`auth/register/`, user);
      toast.error(data);

      setIsAuth(true);
      setRole(role);
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);
      if (role === "user") {
        navigate("/myPosts");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const password = watch("password");

  return (
    <section className="register">
      <div className="container">
        <h2 className="sectionTitle">Register</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              style={{
                border: `1px solid ${errors.first_name ? "red" : ""}`,
              }}
              className="firstName"
              {...register("first_name", {
                required: "Firstname is required!",
              })}
              type="text"
              placeholder="Firstname"
            />
            {errors.first_name ? <p>{errors.first_name?.message}</p> : null}
          </div>
          <div>
            <input
              style={{
                border: `1px solid ${errors.last_name ? "red" : ""}`,
              }}
              className="lastName"
              type="text"
              {...register("last_name", {
                required: "Lastname is required!",
              })}
              placeholder="Lastname"
            />
            {errors.last_name ? <p>{errors.last_name?.message}</p> : null}
          </div>
          <div>
            <input
              style={{
                border: `1px solid ${errors.username ? "red" : ""}`,
              }}
              className="username"
              type="text"
              {...register("username", {
                required: "Username is required!",
              })}
              placeholder="Username"
            />
            {errors.username ? <p>{errors.username?.message}</p> : null}
          </div>
          <div>
            <input
              style={{
                border: `1px solid ${errors.password ? "red" : ""}`,
              }}
              className="password"
              type="password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 5,
                  message: "Password minimal length must be 5",
                },
              })}
              placeholder="Password"
            />
            {errors.password ? <p>{errors.password?.message}</p> : null}
          </div>
          <div>
            <input
              style={{
                border: `1px solid ${errors.confirmPassword ? "red" : ""}`,
              }}
              className="password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required!",
                validate: (value) =>
                  value === password || "The passwords do not match!",
              })}
              placeholder="Confirm password"
            />
            {errors.confirmPassword ? (
              <p>{errors.confirmPassword?.message}</p>
            ) : null}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
