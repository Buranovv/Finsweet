import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import PropTypes from "prop-types";
import categoryReducer from "../reducers/category";
import userReducer from "../reducers/user";
import postReducer from "../reducers/post";
import commentReducer from "../reducers/comment";

const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
