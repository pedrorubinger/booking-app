import { combineReducers, createStore } from 'redux';

// REDUCERS
import Auth from './reducers/auth.js';
import HomeNav from './reducers/home-nav';

const appReducer = combineReducers({
  Auth,
  HomeNav,
});

const store = createStore(appReducer);

export { store };
