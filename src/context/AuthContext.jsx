import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { ROLE, TOKEN } from "../constants";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(Boolean(Cookies.get(TOKEN)));
  const [role, setRole] = useState(Cookies.get(ROLE));

  const state = { isAuth, role, setIsAuth, setRole };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthContextProvider;
