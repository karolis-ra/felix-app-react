import { combineReducers, legacy_createStore as createStore } from 'redux';
import contentReducer from '../content/reducer';
import loginReducer from '../content/loginReducer';

const rootReducer = combineReducers({
  content: contentReducer,
  login: loginReducer
});
const store = createStore(rootReducer);

export default store;
