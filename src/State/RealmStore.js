import realm from './Model';
import { createRealmStore, combineWriters } from 'realm-react-redux';
import { writers } from './Ducks';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './Middlewares';

export var realmDispatch;
export default function configureRealmStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createRealmStore(
    combineWriters(writers),
    {
      realm,
      allowUnsafeWrites: true,
      watchUnsafeWrites: true,
    },
    applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(rootSaga, store.dispatch);
  realmDispatch = store.dispatch;
  return store;
}
