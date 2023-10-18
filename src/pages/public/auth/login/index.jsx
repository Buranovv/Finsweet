import { useForm } from "react-hook-form";
import "../style.scss";
import request from "../../../../server";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../../../../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { setIsAuth, setRole, getUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const user = {
      username: data.username,
      password: data.password,
    };
    try {
      const {
        data: { token, role },
      } = await request.post(`auth/login/`, user);
      toast.error(data);

      setIsAuth(true);
      getUser();
      setRole(role);
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);

      request.defaults.headers.Authorization = `Bearer ${token}`;

      if (role === "user") {
        navigate("/myPosts");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <h2 className="sectionTitle">Login</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
