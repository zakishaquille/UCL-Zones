document.addEventListener("DOMSubtreeModified", function() {
  document.querySelectorAll("#body-content a.nav-page").forEach(function(elm) {
    elm.addEventListener("click", function(event) {
      var page = event.target.getAttribute("href").substr(1);
      var param = null;
      var idxParam = page.indexOf('/');

      if(idxParam >= 0) {
        param = page.substring(idxParam+1);
        page = page.substring(0, idxParam);
      }

      loadPage(page, param);
    });
  });
}, false);

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  // Load page content
  var page = window.location.hash.substr(1);
  var param = null;

  if (page == '') page = 'home';
  else {
    var idxParam = page.indexOf('/');

    if(idxParam >= 0) {
      param = page.substring(idxParam+1);
      page = page.substring(0, idxParam);
    }
  }

  loadPage(page, param);

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll('.sidenav a, .topnav a')
          .forEach(function(elm) {
            elm.addEventListener('click', function(event) {
              var sidenav = document.querySelector('.sidenav');
              M.Sidenav.getInstance(sidenav).close();

              page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }
});

function loadPage(page, param=null) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      var content = document.querySelector('#body-content');
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = '<h4>Page not found.</h4>';
      } else {
        content.innerHTML = "<h4>Oops.. page can't accessed.</h4>";
      }
    }
  };

  page = route(page, param);

  xhttp.open('GET', 'pages/' + page + '.html', true);
  xhttp.send();
}

// Routing Page
function route(page, param) {
  var actualPage = 'home';

  if(page == 'home') getStandings();
  else if(page == 'team' && param != null) {
    actualPage = 'team';
    getTeam(param);
  } else if(page == 'team-schedules' && param != null) {
    actualPage = 'team';
    getHeadTeam(param);
    getTeamSchedule(param);
  } else if(page == 'team-players' && param != null) {
    actualPage = 'team';
    getHeadTeam(param);
    getTeamPlayer(param);
  }

  return actualPage;
}