function giphyParty() {
  const form = document.querySelector('form');
  const results = document.querySelector('#results');
  const btnSearch = document.querySelector('#btn-search');

  async function searchGiphy(searchterm) {
    const key = api.giphy;
    const res = await axios.get('http://api.giphy.com/v1/gifs/search', {
      params: {
        q: searchterm,
        api_key: key,
        limit: 20,
      },
    });
    const num = Math.floor(Math.random() * 19) + 1;
    renderGif(res.data.data[num].embed_url);
  }

  function renderGif(url) {
    const newIframe = document.createElement('iframe');
    newIframe.classList.add('new-gif');
    newIframe.setAttribute('src', url);
    results.append(newIframe);
  }

  btnSearch.addEventListener('click', function (e) {
    e.preventDefault();
    const searchInput = document.querySelector('input');
    if (searchInput.value === '') {
      alert('please enter a searchterm ');
    } else {
      searchGiphy(searchInput.value);
      searchInput.value = '';
    }
  });

  document.querySelector('#remove').addEventListener('click', function () {
    const gifs = document.querySelectorAll('iframe');
    gifs.forEach(function (val) {
      val.remove();
    });
    return;
  });
}

giphyParty();
