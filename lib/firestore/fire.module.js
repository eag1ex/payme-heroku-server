const debug = require('debug')('firestore-snippets-node');

/**
 * todo we will have to mangle firestore db names for security 
 */
// https://github.com/firebase/snippets-node
// [START firestore_deps]

// We supress these logs when not in NODE_ENV=debug for cleaner Mocha output
//var console = {log: debug};
const Fireconfig = require('./fire.config');
const { isObject, isFunction, isEmpty, isNumber,uniq } = require('lodash');
const notify = require('../notifications')()
class Firestore extends Fireconfig {
  constructor(debug = false) {
    super();
    this.debug = debug;
    this._admin = null;
    this._db = null;
    this.init();
  }

  init() {
    this.INIT_FIRE_NINJA()
  }
  get ADMIN() {
    if (this._admin) return this._admin
    try {

      this._admin = require('firebase-admin');
      console.log('[ADMIN] config set')
    } catch (err) {
      console.log('-- [ADMIN] config error', err)
    }
    return this._admin;
  }

  get DB() {
    if (this._db) return this._db;
    try {
      this._db = this.ADMIN.firestore();
      this._db.settings(this.DB_SETTINGS)
      console.log('[DB] firestore set')
    } catch (err) {
      console.log('-- error DB firestore', err)
    }
    return this._db;
  }

  INIT_FIRE_NINJA() {
    try {
      this.ADMIN.initializeApp({
        credential: this.ADMIN.credential.cert(this.serviceAccount),
        databaseURL: this.databaseURL
      });
      console.log('[INIT_FIRE_NINJA] initiated')
    } catch (err) {
      console.log('-- error [INIT_FIRE_NINJA]', err)
    }
    return this;
  }

  getOne(id, col = '', done) {
    if (!this.dbHash[col]) {
      notify.s('[getOne] collection not set', true);
      done({ error: true, message: "[getOne] collection not set" })
      return
    }

    var colectionsRef = this.DB.collection(this.dbHash[col])
    var queryRef = colectionsRef.where('id', '==', id);
    const readyData = [];
    return queryRef.get().then(snapshot => {
      snapshot.forEach(doc => {
        readyData.push(doc.data())
      });
      return Promise.resolve(readyData);
    }).then(resp => {
      const d = { success: true, response: resp }
      if (!resp.length) d.message = `id: ${id} not found`;
      done(d);
    })
      .catch(err => {
        done({ error: err })
      });
  }

  getAllInCollection(col = '', done) {
    if (!this.dbHash[col]) {
      notify.s('[getAllInCollection] collection not set', true);
      done({ error: true, message: "[getAllInCollection] collection not set" })
      return
    }
    var colectionsRef = this.DB.collection(this.dbHash[col]);
    const readyData = [];
    var allCols = colectionsRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          readyData.push(doc.data())
        });
        return Promise.resolve(readyData)
      }).then((resp) => {
        const d = { success: true, response: resp };
        if (!resp.length) d.message = `no documents in collection found`;
        done(d)
      })
      .catch(err => {
        console.log('Error getting documents', err);
        done({ error: err })
      });
  }

  deleteDocuments(idsArr, col = '', done) {
    // [START delete_document]
    if (!this.dbHash[col]) {
      notify.s('[deleteDocument] col not set', true);
      done({ error: true, message: '[deleteDocument] col not set' })
      return
    }
    var collection = this.DB.collection(this.dbHash[col]);

    var dels = []
    collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        const found = idsArr.filter(n => Number(n) === doc.data().id).length;
        if (found) {
          dels.push(doc.id);
        }

      });
      return Promise.resolve(uniq(dels))
    }).then(delRefs => {
      if (!delRefs.length) return done({ error: true, message: `no items found to delete` });
      const deleted = [];
      delRefs.forEach((ref, inx) => {
        collection.doc(ref).delete(); // delete from db

        // fake deletion timeout,shortcut
        const resolved = new Promise((resolve) => {
          setTimeout(() => {
            resolve(ref)
          }, 200)
        })
        deleted.push(resolved);
      })// each

      Promise.all(deleted).then((d) => {
     //   console.log('???', d)
        done({ success: true, message: `deleted count:${d.length}`, response: true });
      }).catch(err => {
        throw ('error deleting');
      })

    }).catch(err => {
      done({ error: err });
    })
  }

  /**
   * @setNewDynamicDocument
   */
  setNewDynamicDocument(col = '', data, done) {

    if (!this.dbHash[col]) {
      notify.s('[setNewDynamicDocument] docID/col not set', true);
      done({ error: true, message: '[setNewDynamicDocument] docID/col not set' })
      return;
    }
    /// get last id before adding new one
    var doc = this.DB.collection(this.dbHash[col]);
    var inx = 0
    const getAll = doc.get().then(snapshot => {
      // NOTE if no data it will skipp to finally
      snapshot.forEach(doc => {
        const d = doc.data();
        if(d.name.toLowerCase() ===data.name.toLowerCase()) {
          throw(`sorry, name: ${d.name} already exists!`);
        }
        inx++;
      });
      return Promise.resolve(inx);
    }).then(() => {
      //
      data.id = Number(inx) + 1;// next available id
      //
      Add(data, (resp) => {
        done(resp)
      })
    }).catch(err => {
      done({ error: err })
    });

    function Add(data, _cb) {
      const _add = doc.add(data).then(ref => {
        const docID = ref.id;
        _cb({ id: docID, message: 'document added', success: true, response: true })
      }).catch((err) => {
        _cb({ error: err, message: 'adding item error' })
      })
    }
  }
}

const FirestoreSandBox = require('./fire-sandbox')(Firestore)
module.exports = FirestoreSandBox;

