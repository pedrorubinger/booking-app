import { combineReducers, createStore } from 'redux';

// REDUCERS
import Auth from './reducers/auth.js';

const appReducer = combineReducers({
  Auth,
});

const store = createStore(appReducer);

export { store };
