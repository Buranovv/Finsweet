import { useContext } from "react";
import "./style.scss";
import { AuthContext } from "../../../context/AuthContext";
import Cookies from "js-cookie";
import { ROLE, TOKEN } from "../../../constants";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const { setIsAuth, setRole } = useContext(AuthContext);

  const logout = () => {
    Cookies.remove(TOKEN);
    Cookies.remove(ROLE);
    setIsAuth(false);
    setRole(null);
    navigate("/");
  };

  return (
    <section className="account">
      <div className="container">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </section>
  );
};

export default AccountPage;
