import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
var reducers = require('../reducers');
import {persistStore, autoRehydrate} from 'redux-persist'
import { AsyncStorage } from 'react-native';


const enhancer = compose(
  applyMiddleware(thunk)
);

function configureStore(onComplete: ?() => void) {
  const store = createStore(reducers, enhancer, autoRehydrate());
  //persistStore(store, onComplete).purge();
  return store
}

module.exports = configureStore;
