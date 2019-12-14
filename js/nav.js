document.addEventListener("DOMSubtreeModified", function() {
  document.querySelectorAll("#body-content a.nav-page").forEach(function(elm) {
    elm.addEventListener("click", navPageClicked);
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

// Navigation non menu event listener
function navPageClicked(event) {
  var page = event.target.getAttribute("href").substr(1);
  var param = null;
  var idxParam = page.indexOf('/');

  if(idxParam >= 0) {
    param = page.substring(idxParam+1);
    page = page.substring(0, idxParam);
  }
  
  loadPage(page, param);
}

function loadPage(page, param=null) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      var content = document.querySelector('#body-content');

      route(page, param);

      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = '<h4>Page not found.</h4>';
      } else {
        content.innerHTML = "<h4>Oops.. page can't accessed.</h4>";
      }
    }
  };

  xhttp.open('GET', 'pages/' + page + '.html', true);
  xhttp.send();
}

// Routing Page
function route(page, param) {
  if(page == 'home') getStandings();
  else if(page == 'team' && param != null) getTeam(param);
  else if(page == 'myfavorite') getAllFavorite();
}