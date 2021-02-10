/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */
/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const results = [];
  const response = await axios.get(
    'http://api.tvmaze.com/search/shows?q=' + query
  );
  response.data.forEach(function (show) {
    if (!show.show.image) {
    } else {
      const obj = {
        id: show.show.id,
        name: show.show.name,
        summary: show.show.summary,
        image: show.show.image.original,
      };
      results.push(obj);
    }
  });
  return results;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $('#shows-list');
  $showsList.empty();
  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <img class="card-img-top" src="${show.image}">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button type="button" class="btn-episodes btn btn-primary" data-bs-toggle="modal" data-bs-target="#epismodal">Episodes</button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($item);
  }

  const btnEpisodes = document.getElementsByClassName('btn-episodes');
  for (let btn of btnEpisodes) {
    btn.addEventListener('click', function () {
      const showId = btn.parentElement.parentElement.parentElement.getAttribute(
        'data-show-id'
      );
      populateEpisodes(getEpisodes(showId));
      const epismodal = new bootstrap.Modal(
        document.querySelector('#epismodal')
      );
      epismodal.show();
      document.querySelector('#close').addEventListener('click', function () {
        epismodal.hide();
      });
    });
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$('#search-form').on('submit', async function handleSearch(evt) {
  evt.preventDefault();

  let query = $('#search-query').val();
  if (!query) return;

  let shows = await searchShows(query);
  populateShows(shows);

  query = $('#search-query').val('');
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const results = [];
  const response = await axios.get(
    `http://api.tvmaze.com/shows/${id}/episodes`
  );
  response.data.forEach(function (episode) {
    const obj = {
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    };
    results.push(obj);
  });
  return results;
}

async function populateEpisodes(list) {
  const array = await list;
  const episodesList = document.querySelector('#episodes-list');
  // remove existing items from list:
  const erasure = Array.from(episodesList.children);
  for (let item of erasure) {
    item.remove();
  }

  // add episodes to list:
  array.forEach(function (episode) {
    const li = document.createElement('li');
    li.innerText = `${episode.name} (season ${episode.season}, number ${episode.number})`;
    episodesList.append(li);
  });
}
