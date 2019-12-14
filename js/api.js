var base_url = 'https://api.football-data.org/v2/';
var apiToken = 'fd9d61eada684f5098fdd9edcdcf4f46';
var isCached = false;

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
  if(!isCached) document.getElementById("content").innerHTML = '<h4>Oops.. page can\'t accessed.</h4>';
}

//============== Req Football API ==============

function getStandings() {
  if ('caches' in window) {
    caches.match(base_url + "competitions/2001/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var contentHTML = "";

          data.standings.forEach(function(standings) {
            if(standings.type == 'TOTAL') {

              contentHTML += `
                <div class="col s12 group-table card">
                  <table class="striped highlight responsive-table">
                    <thead>
                      <tr>
                        <th colspan="2">${standings.group.replace('_', ' ')}</th>
                        <th>GP</th>
                        <th>PTS</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                      </tr>
                    </thead>
                    <tbody>
              `;

              standings.table.forEach(function(content){
                contentHTML += `
                  <tr>
                    <td>${content.position}</td>
                    <td><a class="nav-page" href='#team/${content.team.id}'><img class="img-small" src='${content.team.crestUrl}'/>${content.team.name}</a></td>
                    <td>${content.playedGames}</td>
                    <td>${content.points}</td>
                    <td>${content.won}</td>
                    <td>${content.draw}</td>
                    <td>${content.lost}</td>
                    <td>${content.goalsFor}</td>
                    <td>${content.goalsAgainst}</td>
                    <td>${content.goalDifference}</td>
                  </tr>
                `;
              });

              contentHTML += `</tbody></table></div>`;
            }
          });

          document.getElementById("content").innerHTML = contentHTML;
          isCached = true;
        });
      } else {
        isCached = false;
      }
    });
  }

  fetch(base_url + "competitions/2001/standings", {
    headers: {
      'X-Auth-Token': apiToken
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      var contentHTML = "";

      data.standings.forEach(function(standings) {
        if(standings.type == 'TOTAL') {

          contentHTML += `
            <div class="col s12 group-table card">
              <table class="striped highlight responsive-table">
                <thead>
                  <tr>
                    <th colspan="2">${standings.group.replace('_', ' ')}</th>
                    <th>GP</th>
                    <th>PTS</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                  </tr>
                </thead>
                <tbody>
          `;

          standings.table.forEach(function(content){
            contentHTML += `
              <tr>
                <td>${content.position}</td>
                <td><a class="nav-page" href='#team/${content.team.id}'><img class="img-small" src='${content.team.crestUrl}'/>${content.team.name}</a></td>
                <td>${content.playedGames}</td>
                <td>${content.points}</td>
                <td>${content.won}</td>
                <td>${content.draw}</td>
                <td>${content.lost}</td>
                <td>${content.goalsFor}</td>
                <td>${content.goalsAgainst}</td>
                <td>${content.goalDifference}</td>
              </tr>
            `;
          });

          contentHTML += `</tbody></table></div>`;
        }
      });

      document.getElementById("content").innerHTML = contentHTML;
    })
    .catch(error);
}

function getTeam(idTeam) {
  if ('caches' in window) {
    caches.match(base_url + "teams/" + idTeam).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var contentHTML = addTeamInfo(data);
          contentHTML += addTeamPlayers(data.squad);

          var elems = document.querySelectorAll('.fixed-action-btn');
          M.FloatingActionButton.init(elems);
          var fab = document.getElementById('addFavorite');
          fab.addEventListener("click", addFavorite);
          fab.myParam = data;

          if(data.crestUrl) document.getElementById("teamLogo").innerHTML = `<img class="img-detail" src="${data.crestUrl}"/>`;
          document.getElementById("teamName").innerHTML = data.name;
          document.getElementById("content").innerHTML = contentHTML;
          isCached = true;
        });
      } else {
        isCached = false;
      }
    });
  }

  fetch(base_url + "teams/" + idTeam, {
    headers: {
      'X-Auth-Token': apiToken
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      var contentHTML = addTeamInfo(data);
      contentHTML += addTeamPlayers(data.squad);

      var elems = document.querySelectorAll('.fixed-action-btn');
      M.FloatingActionButton.init(elems);
      var fab = document.getElementById('addFavorite');
      fab.addEventListener("click", addFavorite);
      fab.myParam = data;

      if(data.crestUrl) document.getElementById("teamLogo").innerHTML = `<img class="img-detail" src="${data.crestUrl}"/>`;
      document.getElementById("teamName").innerHTML = data.name;
      document.getElementById("content").innerHTML = contentHTML;
    })
    .catch(error);
}

function getAllFavorite() {
  var contentHTML = '';

  getListFavorite().then(function(items) {
    if(items.length > 0) {
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
    } else {
      contentHTML = '<h5>Your favorite list still empty</h5>';
    }
  
    document.getElementById("content").innerHTML = contentHTML;
  });
}

//============== Sub function ==============

function addTeamInfo(data) {
  var contentHTML = `
    <div class="row card">
      <div class="col s12 m6">
        <table>
          <tr>
              <td>Name</td><td>:</td><td>${data.name}</td>
          </tr>
          <tr>
              <td>Short Name</td><td>:</td><td>${data.shortName}</td>
          </tr>
          <tr>
              <td>Address</td><td>:</td><td>${data.address}</td>
          </tr>
          <tr>
              <td>Founded</td><td>:</td><td>${data.founded}</td>
          </tr>
          <tr>
              <td>Club Colors</td><td>:</td><td>${data.clubColors}</td>
          </tr>
        </table>
      </div>
      <div class="col s12 m6">
        <table>
          <tr>
              <td>Phone</td><td>:</td><td>${data.phone}</td>
          </tr>
          <tr>
              <td>Email</td><td>:</td><td>${data.email}</td>
          </tr>
          <tr>
              <td>Website</td><td>:</td><td><a href="${data.website}" target="_blank">${data.website}</a></td>
          </tr>
          <tr>
              <td>Venue</td><td>:</td><td>${data.venue}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  return contentHTML;
}

function addTeamPlayers(data) {
  var contentHTML = `
    <div class="row card">
      <div class="col s12">
        <table class="striped highlight responsive-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Roster</th>
                    <th>No</th>
                    <th>Pos</th>
                    <th>Nationality</th>
                </tr>
            </thead>
            <tbody>
  `;

  data.forEach(function(content, i) {
    contentHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${content.name}</td>
        <td>${content.shirtNumber ? content.shirtNumber : '-'}</td>
        <td>${content.position ? content.position.charAt(0) : '-'}</td>
        <td>${content.nationality}</td>
      </tr>
    `;
  });

  contentHTML += `</tbody></table></div></div>`;

  return contentHTML;
}

// Add favorite function for pass by reference
function addFavorite(event) {
  insertFavorite(event.currentTarget.myParam);
}