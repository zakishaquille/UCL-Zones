var base_url = 'https://api.football-data.org/v2/';
var apiToken = 'fd9d61eada684f5098fdd9edcdcf4f46';

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
        });
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

          if(data.crestUrl) document.getElementById("teamLogo").innerHTML = `<img class="img-detail" src="${data.crestUrl}"/>`;
          document.getElementById("teamName").innerHTML = data.name;
          document.getElementById("content").innerHTML = contentHTML;
        });
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

      if(data.crestUrl) document.getElementById("teamLogo").innerHTML = `<img class="img-detail" src="${data.crestUrl}"/>`;
      document.getElementById("teamName").innerHTML = data.name;
      document.getElementById("content").innerHTML = contentHTML;
    })
    .catch(error);
}

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
              <td>Website</td><td>:</td><td>${data.website}</td>
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