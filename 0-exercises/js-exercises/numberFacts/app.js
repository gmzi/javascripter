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

function getDeck() {
  return axios.get(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  );
}

function getCard(deck) {
  return axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`);
}

getDeck().then((res) => {
  myDeck = res.data.deck_id;
  console.log('deck ' + myDeck);
  const btnDraw = document.querySelector('#btn-draw');
  const cardsDiv = document.querySelector('.cards-container');
  const remains = document.querySelector('#remains');
  btnDraw.addEventListener('click', function () {
    const newCard = document.createElement('img');
    getCard(myDeck).then((drawedCard) => {
      console.log(drawedCard.data);
      console.log(drawedCard.data.remaining);
      console.log(drawedCard.data.cards[0].image);
      newCard.setAttribute('class', 'card');
      newCard.setAttribute('src', `${drawedCard.data.cards[0].image}`);
      cardsDiv.append(newCard);
      remains.innerText = `${drawedCard.data.remaining} cards left in deck`;
    });
  });
});
