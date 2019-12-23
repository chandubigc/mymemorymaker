/* flow-disable */

import Realm from 'realm';
import _ from 'lodash';
import realm from './realm';

export Model from './Model';
export { ChatMessages } from './ChatMessages';
export Contacts from './Contacts';
export ContactGroups from './ContactGroups';
export { User } from './User';
export ContactThreads from './ContactThreads';


export default realm;

export function cloneRealmObj(obj) {
  function customizer(value) {
    if (value instanceof Realm.Object) {
      return _.cloneDeepWith({ ...value }, customizer);
    }
    if (value instanceof Realm.Collection) {
      return [...value].map(v => _.cloneDeepWith(v, customizer));
    }
  }
  return _.cloneDeepWith(obj, customizer);
}
