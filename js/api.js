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

function getEvents() {
  if ('caches' in window) {
    caches.match(base_url + "eventsnextleague.php?id=4328").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          var contentHTML = "";
          data.events.forEach(function(content) {
            contentHTML += `
              <div class="col s12 m4">
                <div class="card horizontal">
                  <div class="card-stacked">
                    <div class="card-content center-align">
                      <p>${content.strLeague}</p>
                      <div class="row center-align">
                        <div class="col s6">
                          <p>${content.strHomeTeam}</p>
                          <p>${content.intHomeScore}</p>
                        </div>
                        <div class="col s6">
                          <p>${content.strAwayTeam}</p>
                          <p>${content.intAwayScore}</p>
                        </div>
                      </div>
                    </div>
                    <div class="card-action">
                      <a href="./event.html?id=${content.idEvent}" class="nav-page">More...</a>
                    </div>
                  </div>
                </div>
              </div>
            `;
          });

          document.getElementById("events").innerHTML = contentHTML;
        })
      }
    })
  }

  fetch(base_url + "eventsnextleague.php?id=4328")
    .then(status)
    .then(json)
    .then(function(data) {
      var contentHTML = "";
      data.events.forEach(function(content) {
        contentHTML += `
          <div class="col s12 m4">
            <div class="card horizontal">
              <div class="card-stacked">
                <div class="card-content center-align">
                  <p>${content.strLeague}</p>
                  <div class="row center-align">
                    <div class="col s6">
                      <p>${content.strHomeTeam}</p>
                      <p>${content.intHomeScore}</p>
                    </div>
                    <div class="col s6">
                      <p>${content.strAwayTeam}</p>
                      <p>${content.intAwayScore}</p>
                    </div>
                  </div>
                </div>
                <div class="card-action">
                  <a href="./event.html?id=${content.idEvent}" class="nav-page">More...</a>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      document.getElementById("events").innerHTML = contentHTML;
    })
    .catch(error);
}

function getEventDetail() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(base_url + "lookupevent.php?id=" + idParam).then(function(response) {
      if (response) {
        response.json().then(function (content) {
          content = content.events[0];

          var contentHTML = `
            <div class="col s12 m4">
              <div class="card horizontal">
                <div class="card-stacked">
                  <div class="card-content center-align">
                    <p>${content.strLeague}</p>
                    <div class="row center-align">
                      <div class="col s5">
                        <p>${content.strHomeTeam}</p>
                        <p>${content.intHomeScore}</p>
                      </div>
                      <div class="col s2">
                        <p>vs</p>
                      </div>
                      <div class="col s5">
                        <p>${content.strAwayTeam}</p>
                        <p>${content.intAwayScore}</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-action">
                    <a href="#">More...</a>
                  </div>
                </div>
              </div>
            </div>
          `;

          document.getElementById("body-content").innerHTML = contentHTML;
        })
      }
    })
  }

  fetch(base_url + "lookupevent.php?id=" + idParam)
    .then(status)
    .then(json)
    .then(function(content) {
      content = content.events[0];

      var contentHTML = `
        <div class="col s12 m4">
          <div class="card horizontal">
            <div class="card-stacked">
              <div class="card-content center-align">
                <p>${content.strLeague}</p>
                <div class="row center-align">
                  <div class="col s5">
                    <p>${content.strHomeTeam}</p>
                    <p>${content.intHomeScore}</p>
                  </div>
                  <div class="col s2">
                    <p>vs</p>
                  </div>
                  <div class="col s5">
                    <p>${content.strAwayTeam}</p>
                    <p>${content.intAwayScore}</p>
                  </div>
                </div>
              </div>
              <div class="card-action">
                <a href="#">More...</a>
              </div>
            </div>
          </div>
        </div>
      `;

      document.getElementById("body-content").innerHTML = contentHTML;
    });
}