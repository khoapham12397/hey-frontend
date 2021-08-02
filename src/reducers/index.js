import {combineReducers} from "redux";
import chatReducer from "./chatReducer";
import addressBookReducer from "./addressBookReducer";
import userReducer from "./userReducer";
import walletReducer from "./walletReducer"

const appReducer = combineReducers({
  chatReducer, addressBookReducer, userReducer, walletReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer