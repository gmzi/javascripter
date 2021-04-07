function numberFacts() {
  const url = 'http://numbersapi.com';

  function getFacts(rangeStart, rangeEnd) {
    let facts = axios
      .get(`${url}/${rangeStart}..${rangeEnd}`, { json: 'json' })
      .then((data) => {
        fillHtml(data.data, 'num-list');
      });
  }

  // ASYNC VERSION:
  async function getFactAsync(rangeStart, rangeEnd) {
    let facts = await axios.get(`${url}/${rangeStart}..${rangeEnd}`, {
      json: 'json',
    });
    // console.log(facts);
  }
  getFactAsync(1, 3);

  function fillHtml(object, listId) {
    const list = document.querySelector(`#${listId}`);
    for (k in object) {
      item = document.createElement('li');
      item.innerText = object[`${k}`];
      list.append(item);
    }
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

  // ASYNC VERSION:
  async function favNumFactsAsync(num) {
    let allFacts = [];
    const list = document.getElementById('fav-num-list');
    for (let i = 0; i < 4; i++) {
      let fact = await axios.get(`${url}/${num}`);
      allFacts.push(fact);
    }
    // console.log(allFacts);
  }
  favNumFactsAsync(5);

  getFacts(10, 15);
  favNumFacts(55);
}

numberFacts();

function cards() {
  function getDeck() {
    return axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
  }

  function getCard(deck) {
    return axios.get(
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
    );
  }

  getDeck().then((res) => {
    myDeck = res.data.deck_id;
    const btnDraw = document.querySelector('#btn-draw');
    const cardsDiv = document.querySelector('.cards-container');
    const remains = document.querySelector('#remains');

    btnDraw.addEventListener('click', function () {
      const newCard = document.createElement('img');
      getCard(myDeck).then((drawedCard) => {
        newCard.setAttribute('class', 'card');
        newCard.setAttribute('src', `${drawedCard.data.cards[0].image}`);
        cardsDiv.append(newCard);
        remains.innerText = `${drawedCard.data.remaining} cards left in deck`;
      });
    });
  });
}
cards();

// ASYNC VERSION:
async function cardsAsync() {
  function getDeck() {
    return axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
  }

  function getCard(deck) {
    return axios.get(
      `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`
    );
  }
  let deck = await getDeck();
  let deckId = deck.data.deck_id;

  let card = await getCard(deckId);
  console.log(card);
}
cardsAsync();
