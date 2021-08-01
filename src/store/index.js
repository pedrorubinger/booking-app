import { combineReducers, createStore } from 'redux';

// REDUCERS
import Ambientes from './reducers/ambientes';
import Auth from './reducers/auth.js';
import HomeNav from './reducers/home-nav';

const appReducer = combineReducers({
  Ambientes,
  Auth,
  HomeNav,
});

const store = createStore(appReducer);

export { store };
