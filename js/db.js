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
        crestUrl: data.crestUrl,
        created: new Date().getTime()
    };
    store.add(item);
    return tx.complete;
  }).then(function() {
    console.log('Data berhasil disimpan.');
  }).catch(function() {
    console.log('Data gagal disimpan.')
  })
}

function getAllFavorite() {
  dbPromise.then(function(db) {
    var tx = db.transaction('favorite_team', 'readonly');
    var store = tx.objectStore('favorite_team');
    return store.getAll();
  }).then(function(items) {
    var contentHTML = '';

    items.forEach(function(data) {
      contentHTML += `
        <div class="col s12 m4">
          <div class="card">
            <div class="card-image thumbnail">
              <img src="${data.crestUrl}">
              <a class="btn-floating halfway-fab waves-effect waves-light red" id="removeFavorite" onclick="deleteFavorite(${data.idTeam})"><i class="material-icons">remove</i></a>
            </div>
            <div class="card-content">
              <span class="card-title truncate"><a class="nav-page" href="#team/${data.idTeam}">${data.name}</a></span>
              <a class="truncate" href="${data.website}" target="_blank">${data.website}</a>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById("content").innerHTML = contentHTML;
  });
}

function deleteFavorite(idTeam) {
  dbPromise.then(function(db) {
    var tx = db.transaction('favorite_team', 'readwrite');
    var store = tx.objectStore('favorite_team');
    store.delete(idTeam);
    return tx.complete;
  }).then(function() {
    console.log('Data berhasil dihapus');
    getAllFavorite();
  }).catch(function() {
    console.log('Data gagal dihapus')
  });
}