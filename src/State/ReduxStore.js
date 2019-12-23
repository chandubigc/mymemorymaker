import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducers } from './Ducks';
// import {apiService, api} from './middlewares';
import { rootSaga } from './Middlewares';
import Reactotron from 'reactotron-react-native';

export var dispatch;
export var getState;

export default function configureStore(initialState) {
  const rootReducer = combineReducers(reducers);
  let sagaMiddleware;
  let store;
  if (__DEV__) {
    sagaMiddleware = createSagaMiddleware({
      sagaMonitor: Reactotron.createSagaMonitor,
    });
    // store = Reactotron.createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(sagaMiddleware),
        Reactotron.createEnhancer()
      )
    );
  } else {
    sagaMiddleware = createSagaMiddleware();
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware)
    );
  }
  sagaMiddleware.run(rootSaga);
  dispatch = store.dispatch;
  getState = store.getState();
  return store;
}
