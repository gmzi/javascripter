function numberFacts() {
  const url = 'http://numbersapi.com';

  function getFacts(rangeStart, rangeEnd) {
    let allFacts;
    let facts = axios
      .get(`${url}/${rangeStart}..${rangeEnd}`, { json: 'json' })
      .then((data) => {
        fillHtml(data.data);
      });
  }

  function fillHtml(object) {
    const list = document.querySelector('#num-list');
    for (k in object) {
      item = document.createElement('li');
      item.innerText = object[`${k}`];
      list.append(item);
    }
  }
  getFacts(10, 15);
}

numberFacts();
