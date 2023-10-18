import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ROLE, TOKEN } from "../constants";
import Cookies from "js-cookie";
import request from "../server";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(Boolean(Cookies.get(TOKEN)));
  const [role, setRole] = useState(Cookies.get(ROLE));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      setLoading(true);
      const { data } = await request.get("auth/me");
      setUser(data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isAuth && getUser();
  }, [isAuth]);

  const state = { isAuth, role, user, loading, setIsAuth, setRole, getUser };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
