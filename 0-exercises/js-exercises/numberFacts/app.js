function numberFacts() {
  const url = 'http://numbersapi.com';

  function getFacts(rangeStart, rangeEnd) {
    let allFacts;
    let facts = axios
      .get(`${url}/${rangeStart}..${rangeEnd}`, { json: 'json' })
      .then((data) => {
        fillHtml(data.data, 'num-list');
      });
  }

  function favNumFacts(num) {
    let allFacts = [];
    const list = document.getElementById('fav-num-list');
    for (let i = 0; i < 4; i++) {
      allFacts.push(axios.get(`${url}/${num}`));
    }
    Promise.all(allFacts)
      .then((data) => {
        for (fact of data) {
          console.log(fact.data);
          item = document.createElement('li');
          item.innerText = fact.data;
          list.append(item);
        }
      })
      .catch((err) => console.log(err));
  }

  function fillHtml(object, listId) {
    const list = document.querySelector(`#${listId}`);
    for (k in object) {
      item = document.createElement('li');
      item.innerText = object[`${k}`];
      list.append(item);
    }
  }
  getFacts(10, 15);
  favNumFacts(55);
}

numberFacts();
