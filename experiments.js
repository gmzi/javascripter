const firstReq = new XMLHttpRequest();
firstReq.addEventListener('load', function () {
  console.log(this.responseText);
});

firstReq.addEventListener('error', () => {
  console.log('Error!!!!!');
});

firstReq.open('GET', 'https://swapi.dev/api/planets');
firstReq.send();
