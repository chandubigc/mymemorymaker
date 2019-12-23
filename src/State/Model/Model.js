import _ from 'lodash';
import realm from './realm';

export default class Model {
  static create(data, update = false) {
    console.log("datain",data);
    let obj = null;
    if (data instanceof Array) {
      realm.write(() => {
        _.forEach(data, item => {
          try {
            realm.create(this.schema.name, item, update);
          } catch (error) {}
        });
      });
    } else {
      realm.write(() => {
        try {
          obj = realm.create(this.schema.name, data, update);
        } catch (error) {
          console.log("ERROR",error);
        }
      });
    }

    return obj;
  }

  static get() {
    return realm.objects(this.schema.name);
  }

  static deleteAll() {
    realm.write(() => {
      realm.delete(this.get());
    });
  }

  static deleteLiveObj(obj) {
    if (obj) {
      realm.write(() => {
        realm.delete(obj);
      });
    }
  }

  static deleteByPk(pk) {
    const obj = realm.objectForPrimaryKey(this.schema.name, pk);
    if (obj) {
      realm.write(() => {
        realm.delete(obj);
      });
    }
  }

  static byPK(pk) {
    return realm.objectForPrimaryKey(this.schema.name, pk);
  }

  static byQuery(query) {
    console.log('BY QUERY', query);
    return realm.objects(this.schema.name).filtered(query);
  }

  setProp(prop, value) {
    realm.write(() => {
      this[prop] = value;
    });
  }
}
