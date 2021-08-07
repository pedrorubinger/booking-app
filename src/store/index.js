import { combineReducers, createStore } from 'redux';

import Ambientes from './reducers/ambientes';
import Auth from './reducers/auth.js';
import HomeNav from './reducers/home-nav';
import Reservas from './reducers/reservas';

const appReducer = combineReducers({
  Ambientes,
  Auth,
  HomeNav,
  Reservas,
});

const store = createStore(appReducer);

export { store };
