var dbPromise = idb.open('ucl_zones', 1, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('favorite_team', {keyPath: 'idTeam'});
  }
});

function insertFavorite(data) {
  dbPromise.then(function(db) {
    var tx = db.transaction('favorite_team', 'readwrite');
    var store = tx.objectStore('favorite_team');
    var item = {
      idTeam: data.id,
      name: data.name,
      website: data.website,
      crestUrl: data.crestUrl.replace(/^http:\/\//i, 'https://'),
      created: new Date().getTime()
    };

    store.put(item);

    return tx.complete;
  }).then(function() {
    M.toast({html: 'Data berhasil disimpan.'})
  }).catch(function() {
    M.toast({html: 'Data gagal disimpan.'})
  })
}

function getListFavorite() {
  return new Promise(function(resolve) {
    dbPromise.then(function(db) {
      var tx = db.transaction('favorite_team', 'readonly');
      var store = tx.objectStore('favorite_team');
      return store.getAll();
    }).then(function(items) {
      resolve(items);
    });
  });
}

function deleteFavorite(idTeam) {
  dbPromise.then(function(db) {
    var tx = db.transaction('favorite_team', 'readwrite');
    var store = tx.objectStore('favorite_team');
    store.delete(idTeam);
    return tx.complete;
  }).then(function() {
    M.toast({html: 'Data berhasil dihapus.'})
    getAllFavorite();
  }).catch(function() {
    M.toast({html: 'Data gagal dihapus.'})
  });
}