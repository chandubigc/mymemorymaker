import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

export default function configureReactotron() {
  Reactotron.configure({
    name: 'React Native App',
    host: '192.168.0.102',
    // host: '172.20.10.14',
    // host: '10.0.0.19',
    // host: '192.168.1.113',
  })
    .useReactNative()
    .use(reduxPlugin())
    .use(sagaPlugin())
    .connect();

  console.log = (...args) => {
    let name = 'CUSTOM_LOG';
    let value = args;
    if (args.length > 1) {
      name = args[0];
      value = args.slice(1, args.length);
    }
    Reactotron.display({
      name,
      value,
    });
  };
}
