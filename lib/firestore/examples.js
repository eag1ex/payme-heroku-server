
function demoInitialize(db) {
    // [START demo_initialize]
    // Fetch data from Firestore
    db.collection('cities').get()
      .then(documentSet => {
        // Print the ID and contents of each document
        documentSet.forEach(doc => {
          console.log(doc.id, ' => ', doc.data());
        });
      })
      .catch(err => {
        // Error fetching documents
        console.log('Error', err);
      });
    // [END demo_initialize]
  }
  
  // ============================================================================
  // https://firebase.google.com/docs/firestore/server/quickstart
  // ============================================================================
  
  function quickstartAddData(db) {
    // [START add_lovelace]
    var docRef = db.collection('users').doc('alovelace');
  
    var setAda = docRef.set({
      first: 'Ada',
      last: 'Lovelace',
      born: 1815
    });
    // [END add_lovelace]
  
    // [START add_turing]
    var aTuringRef = db.collection('users').doc('aturing');
  
    var setAlan = aTuringRef.set({
      'first': 'Alan',
      'middle': 'Mathison',
      'last': 'Turing',
      'born': 1912
    });
    // [END add_turing]
  
    return Promise.all([setAda, setAlan]);
  }
  
  function quickstartQuery(db) {
    // [START quickstart_query]
    // Realtime listens are not yet supported in the Node.js SDK
    var query = db.collection('users').where('born', '<', 1900)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    // [END quickstart_query]
  
    return query;
  }
  
  function quickstartListen(db) {
    // [START quickstart_listen]
    db.collection('users').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
    // [END quickstart_listen]
  }
  
  // ============================================================================
  // https://firebase.google.com/docs/firestore/data-model
  // ============================================================================
  
  function basicReferences(db) {
    // [START doc_ref]
    var alovelaceDocumentRef = db.collection('users').doc('alovelace');
    // [END doc_ref]
  
    // [START collection_ref]
    var usersCollectionRef = db.collection('users');
    // [END collection_ref]
  }
  
  function advancedReferences(db) {
    // [START doc_ref_alternate]
    var alovelaceDocumentRef = db.doc('users/alovelace');
    // [END doc_ref_alternate]
  
    // [START subcollection_ref]
    var messageRef = db.collection('rooms').doc('roomA')
      .collection('messages').doc('message1');
    // [END subcollection_ref]
  }
  
  // ============================================================================
  // https://firebase.google.com/docs/firestore/server/save-data
  // ============================================================================
  
  function setDocument(db) {
    // [START set_document]
    var data = {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA'
    };
  
    // Add a new document in collection "cities" with ID 'LA'
    var setDoc = db.collection('cities').doc('LA').set(data);
    // [END set_document]
  
    return setDoc.then(res => {
      console.log('Set: ', res);
    });
  }
  
  function dataTypes(db) {
    // [START data_types]
    var data = {
      stringExample: 'Hello, World!',
      booleanExample: true,
      numberExample: 3.14159265,
      dateExample: new Date('December 10, 1815'),
      arrayExample: [5, true, 'hello'],
      nullExample: null,
      objectExample: {
        a: 5,
        b: true
      }
    };
  
    var setDoc = db.collection('data').doc('one').set(data);
    // [END data_types]
  
    return setDoc.then(res => {
      console.log('Set: ', res);
    });
  }
  
  function addDocument(db) {
    // [START add_document]
    // Add a new document with a generated id.
    var addDoc = db.collection('cities').add({
      name: 'Tokyo',
      country: 'Japan'
    }).then(ref => {
      console.log('Added document with ID: ', ref.id);
    });
    // [END add_document]
  
    return addDoc.then(res => {
      console.log('Add: ', res);
    });
  }
  
  function addDocumentWithId(db) {
    var data = {foo: 'bar '};
  
    // [START add_document_id]
    db.collection('cities').doc('new-city-id').set(data);
    // [END add_document_id]
  }
  
  function addLater(db) {
    // [START add_later]
    var newCityRef = db.collection('cities').doc();
  
    // Later...
    var setDoc = newCityRef.set({
      // ...
    });
    // [END add_later]
  
    return setDoc.then(res => {
      console.log('Add: ', res);
    });
  }
  
  function updateDocument(db) {
    // [START update_document]
    var cityRef = db.collection('cities').doc('DC');
  
    // Set the 'capital' field of the city
    var updateSingle = cityRef.update({capital: true});
    // [END update_document]
  
    return Promise.all([updateSingle]).then(res => {
      console.log('Update: ', res);
    });
  }
  
  function updateDocumentArray(db) {
    // [START update_document_array]
    var admin = require('firebase-admin');
    // ...
    var washingtonRef = db.collection('cities').doc('DC');
  
    // Atomically add a new region to the "regions" array field.
    var arrUnion = washingtonRef.update({
      regions: admin.firestore.FieldValue.arrayUnion('greater_virginia')
    });
    // Atomically remove a region from the "regions" array field.
    var arrRm = washingtonRef.update({
      regions: admin.firestore.FieldValue.arrayRemove('east_coast')
    });
    // [END update_document_array]
  
    return Promise.all([arrUnion, arrRm]).then(res => {
      console.log('Update array: ', res);
    });
  }
  
  function updateDocumentMany(db) {
    // [START update_document_many]
    var cityRef = db.collection('cities').doc('DC');
  
    var updateMany = cityRef.update({
      name: 'Washington D.C.',
      country: 'USA',
      capital: true
    });
    // [END update_document_many]
  
    return updateMany.then(res => {
      console.log('Update: ', res);
    });
  }
  
  function updateCreateIfMissing(db) {
    // [START update_create_if_missing]
    var cityRef = db.collection('cities').doc('BJ');
  
    var setWithOptions = cityRef.set({
      capital: true
    }, {merge: true});
    // [END update_create_if_missing]
  
    return setWithOptions.then(res => {
      console.log('Update: ', res);
    });
  }
  
  function updateServerTimestamp(db) {
    // Create the object before updating it (racy on first run, oh well)
    db.collection('objects').doc('some-id').set({});
  
    // [START update_with_server_timestamp]
    // Get the `FieldValue` object
    var FieldValue = require('firebase-admin').firestore.FieldValue;
  
    // Create a document reference
    var docRef = db.collection('objects').doc('some-id');
  
    // Update the timestamp field with the value from the server
    var updateTimestamp = docRef.update({
      timestamp: FieldValue.serverTimestamp()
    });
    // [END update_with_server_timestamp]
  
    return updateTimestamp.then(res => {
      console.log('Update: ', res);
    });
  }
  
  function updateDeleteField(db) {
    // [START update_delete_field]
    // Get the `FieldValue` object
    var FieldValue = require('firebase-admin').firestore.FieldValue;
  
    // Create a document reference
    var cityRef = db.collection('cities').doc('BJ');
  
    // Remove the 'capital' field from the document
    var removeCapital = cityRef.update({
      capital: FieldValue.delete()
    });
    // [END update_delete_field]
  
    return removeCapital.then(res => {
      console.log('Update: ', res);
    });
  }
  
  function updateNested(db) {
    // [START update_nested]
    var initialData = {
      name: 'Frank',
      age: 12,
      favorites: {
        food: 'Pizza',
        color: 'Blue',
        subject: 'recess'
      }
    };
  
    // [START_EXCLUDE]
    db.collection('users').doc('Frank').set(initialData);
    // [END_EXCLUDE]
    var updateNested = db.collection('users').doc('Frank').update({
      age: 13,
      'favorites.color': 'Red'
    });
    // [END update_nested]
  
    return updateNested.then(res => {
      console.log('Update: ', res);
    });
  }
  
  function deleteDocument(db) {
    // [START delete_document]
    var deleteDoc = db.collection('cities').doc('DC').delete();
    // [END delete_document]
  
    return deleteDoc.then(res => {
      console.log('Delete: ', res);
    });
  }
  
  function transaction(db) {
    // [START transaction]
    // Initialize document
    var cityRef = db.collection('cities').doc('SF');
    var setCity = cityRef.set({
      name: 'San Francisco',
      state: 'CA',
      country: 'USA',
      capital: false,
      population: 860000
    });
  
    var transaction = db.runTransaction(t => {
      return t.get(cityRef)
        .then(doc => {
          // Add one person to the city population
          var newPopulation = doc.data().population + 1;
          t.update(cityRef, {population: newPopulation});
        });
    }).then(result => {
      console.log('Transaction success!');
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
    // [END transaction]
  
    return transaction;
  }
  
  function transactionWithResult(db) {
    // [START transaction_with_result]
    var cityRef = db.collection('cities').doc('SF');
    var transaction = db.runTransaction(t => {
      return t.get(cityRef)
        .then(doc => {
          var newPopulation = doc.data().population + 1;
          if (newPopulation <= 1000000) {
            t.update(cityRef, {population: newPopulation});
            return Promise.resolve('Population increased to ' + newPopulation);
          } else {
            return Promise.reject('Sorry! Population is too big.');
          }
        });
    }).then(result => {
      console.log('Transaction success', result);
    }).catch(err => {
      console.log('Transaction failure:', err);
    });
    // [END transaction_with_result]
  
    return transaction;
  }
  
  function updateBatch(db) {
    // [START update_data_batch]
    // Get a new write batch
    var batch = db.batch();
  
    // Set the value of 'NYC'
    var nycRef = db.collection('cities').doc('NYC');
    batch.set(nycRef, {name: 'New York City'});
  
    // Update the population of 'SF'
    var sfRef = db.collection('cities').doc('SF');
    batch.update(sfRef, {population: 1000000});
  
    // Delete the city 'LA'
    var laRef = db.collection('cities').doc('LA');
    batch.delete(laRef);
  
    // Commit the batch
    return batch.commit().then(function () {
      // [START_EXCLUDE]
      console.log('Batched.');
      // [END_EXCLUDE]
    });
    // [END update_data_batch]
  }
  
  // ============================================================================
  // https://firebase.google.com/docs/firestore/server/retrieve-data
  // ============================================================================
  
  function exampleData(db) {
    // [START example_data]
    var citiesRef = db.collection('cities');
  
    var setSf = citiesRef.doc('SF').set({
      name: 'San Francisco', state: 'CA', country: 'USA',
      capital: false, population: 860000,
      regions: ['west_coast', 'norcal']
    });
    var setLa = citiesRef.doc('LA').set({
      name: 'Los Angeles', state: 'CA', country: 'USA',
      capital: false, population: 3900000,
      regions: ['west_coast', 'socal']
    });
    var setDc = citiesRef.doc('DC').set({
      name: 'Washington, D.C.', state: null, country: 'USA',
      capital: true, population: 680000,
      regions: ['east_coast']
    });
    var setTok = citiesRef.doc('TOK').set({
      name: 'Tokyo', state: null, country: 'Japan',
      capital: true, population: 9000000,
      regions: ['kanto', 'honshu']
    });
    var setBj = citiesRef.doc('BJ').set({
      name: 'Beijing', state: null, country: 'China',
      capital: true, population: 21500000,
      regions: ['jingjinji', 'hebei']
    });
    // [END example_data]
  
    return Promise.all([setSf, setLa, setDc, setTok, setBj]);
  }
  
  function exampleDataTwo(db) {
    // [START example_data_two]
    var citiesRef = db.collection('cities');
  
    var setSf = citiesRef.doc('SF').set({
      name: 'San Francisco', state: 'CA', country: 'USA',
      capital: false, population: 860000
    });
    var setLa = citiesRef.doc('LA').set({
      name: 'Los Angeles', state: 'CA', country: 'USA',
      capital: false, population: 3900000
    });
    var setDc = citiesRef.doc('DC').set({
      name: 'Washington, D.C.', state: null, country: 'USA',
      capital: true, population: 680000
    });
    var setTok = citiesRef.doc('TOK').set({
      name: 'Tokyo', state: null, country: 'Japan',
      capital: true, population: 9000000
    });
    var setBj = citiesRef.doc('BJ').set({
      name: 'Beijing', state: null, country: 'China',
      capital: true, population: 21500000
    });
    // [END example_data_two]
  
    return Promise.all([setSf, setLa, setDc, setTok, setBj]);
  }
  
  function getDocument(db) {
    // [START get_document]
    var cityRef = db.collection('cities').doc('SF');
    var getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    // [END get_document]
  
    return getDoc;
  }
  
  function getDocumentEmpty(db) {
    var cityRef = db.collection('cities').doc('Amexico');
    var getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
        }
      });
  
    return getDoc;
  }
  
  function getMultiple(db) {
    // [START get_multiple]
    var citiesRef = db.collection('cities');
    var query = citiesRef.where('capital', '==', true).get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }  
        
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    // [END get_multiple]
  
    return query;
  }
  
  function getAll(db) {
    // [START get_all]
    var citiesRef = db.collection('cities');
    var allCities = citiesRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    // [END get_all]
  
    return allCities;
  }
  
  function getCollections(db) {
    // [START get_collections]
    var sfRef = db.collection('cities').doc('SF');
    sfRef.getCollections().then(collections => {
      collections.forEach(collection => {
        console.log('Found subcollection with id:', collection.id);
      });
    });
    // [END get_collections]
  }
  
  // ============================================================================
  // https://firebase.google.com/docs/firestore/server/query-data
  // ============================================================================
  
  function simpleQuery(db) {
    // [START simple_query]
    // Create a reference to the cities collection
    var citiesRef = db.collection('cities');
  
    // Create a query against the collection
    var queryRef = citiesRef.where('state', '==', 'CA');
    // [END simple_query]
  
    return simpleQuery.get();
  }
  
  function queryAndFilter(db) {
    // [START create_query]
    // Create a reference to the cities collection
    var citiesRef = db.collection('cities');
  
    // Create a query against the collection
    var queryRef = citiesRef.where('capital', '==', true);
    // [END create_query]
  
    // [START example_filters]
    var brazilCities = citiesRef.where('state', '==', 'CA');
    var smallCities = citiesRef.where('population', '<', 1000000);
    var afterParis = citiesRef.where('name', '>=', 'San Francisco');
    // [END example_filters]
  
    return Promise.all([brazilCities.get(), smallCities.get(), afterParis.get()])
      .then(res => {
        res.forEach(r => {
          r.forEach(d => {
            console.log('Get:', d);
          });
          console.log();
        });
      });
  }
  
  function arrayFilter(db) {
    var citiesRef = db.collection('cities');
    // [START array_contains_filter]
    var westCoastCities = citiesRef.where('regions', 'array-contains',
      'west_coast');
    // [END array_contains_filter]
  
    return westCoastCities.get()
      .then(res => {
        console.log('West Coast get: ', res);
      });
  }
  
  function orderAndLimit(db) {
    var citiesRef = db.collection('cities');
    // [START order_limit]
    var firstThree = citiesRef.orderBy('name').limit(3);
    // [END order_limit]
  
    // [START order_limit_desc]
    var lastThree = citiesRef.orderBy('name', 'desc').limit(3);
    // [END order_limit_desc]
  
    // [START order_multi_field]
    var byStateByPop = citiesRef.orderBy('state').orderBy('population', 'desc');
    // [END order_multi_field]
  
    // [START where_and_order]
    var biggest = citiesRef.where('population', '>', 2500000)
      .orderBy('population').limit(2);
    // [END where_and_order]
  
    return Promise.all([firstThree.get(), lastThree.get(), biggest.get()])
      .then(res => {
        res.forEach(r => {
          r.forEach(d => {
            console.log('Get:', d);
          });
          console.log();
        });
      });
  }
  
  function validInvalidQueries(db) {
    var citiesRef = db.collection('cities');
  
    // [START valid_chained]
    citiesRef.where('state', '==', 'CO').where('name', '==', 'Denver');
    // [END valid_chained]
  
    // [START invalid_chained]
    citiesRef.where('state', '==', 'CA').where('population', '<', 1000000);
    // [END invalid_chained]
  
    // [START valid_range]
    citiesRef.where('state', '>=', 'CA').where('state', '<=', 'IN');
    citiesRef.where('state', '==', 'CA').where('population', '>', 1000000);
    // [END valid_range]
  
    // [START invalid_range]
    citiesRef.where('state', '>=', 'CA').where('population', '>', 1000000);
    // [END invalid_range]
  
    // [START valid_order_by]
    citiesRef.where('population', '>', 2500000).orderBy('population');
    // [END valid_order_by]
  
    // [START invalid_order_by]
    citiesRef.where('population', '>', 2500000).orderBy('country');
    // [END invalid_order_by]
  }
  
  function streamSnapshot(db, done) {
    // [START query_realtime]
    var query = db.collection('cities').where('state', '==', 'CA');
  
    var observer = query.onSnapshot(querySnapshot => {
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      // [START_EXCLUDE]
      observer();
      done();
      // [END_EXCLUDE]
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
    // [END query_realtime]
  }
  
  function listenDiffs(db, done) {
    // [START listen_diffs]
    var observer = db.collection('cities').where('state', '==', 'CA')
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log('New city: ', change.doc.data());
          }
          if (change.type === 'modified') {
            console.log('Modified city: ', change.doc.data());
          }
          if (change.type === 'removed') {
            console.log('Removed city: ', change.doc.data());
          }
        });
        // [START_EXCLUDE silent]
        observer();
        done();
        // [END_EXCLUDE]
      });
    // [END listen_diffs]
  }
  
  function streamDocument(db, done) {
    // [START doc_realtime]
    var doc = db.collection('cities').doc('SF');
  
    var observer = doc.onSnapshot(docSnapshot => {
      console.log(`Received doc snapshot: ${docSnapshot}`);
      // [START_EXCLUDE]
      observer();
      done();
      // [END_EXCLUDE]
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
    // [END doc_realtime]
  }
  
  function detatchListener(db) {
    // [START detach_listener]
    var unsub = db.collection('cities').onSnapshot(() => {
    });
  
    // ...
  
    // Stop listening for changes
    unsub();
    // [END detach_listener]
  }
  
  function listenErrors(db) {
    // [START listen_errors]
    db.collection('cities')
      .onSnapshot((snapshot) => {
        //...
      }, (error) => {
        //...
      });
    // [END listen_errors]
  }
  
  // ============================================================================
  // https://firebase.google.com/docs/firestore/query-data/query-cursors
  // ============================================================================
  
  function simpleCursors(db) {
    // [START cursor_simple_start_at]
    var startAt = db.collection('cities')
      .orderBy('population')
      .startAt(1000000);
    // [END cursor_simple_start_at]
  
    // [START cursor_simple_end_at]
    var endAt = db.collection('cities')
      .orderBy('population')
      .endAt(1000000);
    // [END cursor_simple_end_at]
  
    return Promise.all([
      startAt.limit(10).get(),
      endAt.limit(10).get()
    ]);
  }
  
  function snapshotCursors(db) {
    // [START fs_start_at_snapshot_query_cursor]
    var docRef = db.collection('cities').doc('SF');
    return docRef.get().then(snapshot => {
      var startAtSnapshot = db.collection('cities')
        .orderBy('population')
        .startAt(snapshot);
  
      return startAtSnapshot.limit(10).get();
    });
    // [END fs_start_at_snapshot_query_cursor]
  }
  
  function paginateQuery(db) {
    // [START cursor_paginate]
    var first = db.collection('cities')
      .orderBy('population')
      .limit(3);
  
    var paginate = first.get()
      .then((snapshot) => {
        // ...
  
        // Get the last document
        var last = snapshot.docs[snapshot.docs.length - 1];
  
        // Construct a new query starting at this document.
        // Note: this will not have the desired effect if multiple
        // cities have the exact same population value.
        var next = db.collection('cities')
          .orderBy('population')
          .startAfter(last.data().population)
          .limit(3);
  
        // Use the query for pagination
        // [START_EXCLUDE]
        return next.get().then((snapshot) => {
          console.log('Num results:', snapshot.docs.length);
        });
        // [END_EXCLUDE]
      });
    // [END cursor_paginate]
  
    return paginate;
  }
  
  function multipleCursorConditions(db) {
    // [START cursor_multiple_one_start]
    // Will return all Springfields
    var startAtName = db.collection('cities')
      .orderBy('name')
      .orderBy('state')
      .startAt('Springfield');
    // [END cursor_multiple_one_start]
  
    // [START cursor_multiple_two_start]
    // Will return 'Springfield, Missouri' and 'Springfield, Wisconsin'
    var startAtNameAndState = db.collection('cities')
      .orderBy('name')
      .orderBy('state')
      .startAt('Springfield', 'Missouri');
    // [END cursor_multiple_two_start]
  
    return Promise.all([
      startAtName.get(),
      startAtNameAndState.get()
    ]);
  }
  
  // [START delete_collection]
  function deleteCollection(db, collectionPath, batchSize) {
    var collectionRef = db.collection(collectionPath);
    var query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
  }
  
  function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
          return 0;
        }
  
        // Delete documents in a batch
        var batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
  
        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
        if (numDeleted === 0) {
          resolve();
          return;
        }
  
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick(() => {
          deleteQueryBatch(db, query, batchSize, resolve, reject);
        });
      })
      .catch(reject);
  }
  
  // [END delete_collection]
  
  // ============================================================================
  // MAIN
  // ============================================================================
  