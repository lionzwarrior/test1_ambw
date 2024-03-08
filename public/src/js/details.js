var params = new URLSearchParams(window.location.search), id = params.get("id");

var url = 'https://tes1-c14210041-default-rtdb.firebaseio.com/posts.json';
var networkDataReceived = false;

function updateUI(data) {
    document.getElementById('detailsTitle').innerText = data.title;
    document.getElementById('detailsImg').src = data.image;
    document.getElementById('detailsDescription').innerText = data.description;
    document.title = data.title;
    console.log("the title is " + data.title);
}

fetch(url)
.then(function(res) {
  return res.json();
})
.then(function(data) {
  networkDataReceived = true;
  console.log('From web', data);
  var dataArray = [];
  for (var key in data) {
    dataArray.push(data[key]);
  }
  updateUI(dataArray[id]);
});

if ('caches' in window) {
  caches.match(url)
    .then(function(response) {
      if (response) {
        return response.json();
      }
    })
    .then(function(data) {
      console.log('From cache', data);
      if (!networkDataReceived) {
        var dataArray = [];
        for (var key in data) {
          dataArray.push(data[key]);
        }
        updateUI(dataArray[id])
      }
    });
}
