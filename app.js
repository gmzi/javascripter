// Nasa image of the day
async function getNasaImg() {
  let key = apis.nasa;
  const response = await axios.get(
    'https://api.nasa.gov/planetary/apod?' + key
  );
  const nasaDiv = document.querySelector('#nasa');
  const videoSource = document.querySelector('#video');
  if (response.data.media_type === 'video') {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'nasa-video');
    iframe.setAttribute('src', response.data.url);
    nasaDiv.append(iframe);
  } else {
    const image = document.createElement('img');
    image.setAttribute('id', 'nasa-image');
    image.setAttribute('class', 'img-thumbnail rounded mx-auto d-block');
    image.setAttribute('src', response.data.url);
    nasaDiv.append(image);
  }
  const description = document.querySelector('#description');
  description.innerText = response.data.title;
}

getNasaImg();

// Next Xspace Launch:
async function getNextLaunch() {
  const response = await axios.get(
    'https://api.spacexdata.com/v4/launches/next'
  );
  const dateAndTime = response.data.date_utc;
  const date = dateAndTime.slice(0, 10);
  const time = dateAndTime.slice(11, dateAndTime.length - 1);

  const launchDate = document.querySelector('#launch-date');
  const launchTime = document.querySelector('#launch-time');
  const missionName = document.querySelector('#mission-name');

  launchDate.innerText = `Date: ${date}`;
  launchTime.innerText = `UTC time: ${time}`;
  missionName.innerText = `Mission name: ${response.data.name}`;

  const launchTitle = document.querySelector('#launch-title');

  const countD = document.querySelector('#countdown');
  countdown(response.data.date_unix, 'countdown');
}

// crewed missions:
async function getCrewedMissions() {
  const response = await axios.get(
    'https://api.spacexdata.com/v4/launches/upcoming'
  );
  const crewedMissions = document.querySelector('#crewed-missions');
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].name.includes('Crew')) {
      const name = response.data[i].name;
      const date = response.data[i].date_local;
      const crewMembers = response.data[i].crew;
      const countDown = 'TODO COUNTDOWN';

      const missDiv = document.createElement('div');
      missDiv.classList.add('card');
      missDiv.setAttribute('style', 'width: 100%;');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const missionName = document.createElement('h5');
      missionName.classList.add('card-title');
      missionName.classList.add('text-center');
      missionName.innerText = name;

      const missionDate = document.createElement('p');
      missionDate.classList.add('card-text');
      missionDate.innerText = date;

      const missionCountdown = document.createElement('a');
      missionCountdown.setAttribute('id', 'crewed-countdown');
      missionCountdown.classList.add('btn');
      missionCountdown.classList.add('btn-dark');
      missionCountdown.classList.add('btn-sm');
      missionCountdown.classList.add('d-block');
      countdown(response.data[i].date_unix, 'crewed-countdown');

      const crewTitle = document.createElement('h4');
      crewTitle.innerText = 'Crew memebers';

      crewTitle.append(missionCountdown);
      missionDate.append(missionCountdown);
      missionName.append(missionDate);
      cardBody.append(missionName);
      missDiv.append(cardBody);
      crewedMissions.append(missDiv);

      // const cardGroup = document.createElement('div');
      // cardGroup.classList.add('card-group');

      crewMembers.forEach(async function (val) {
        const response = await axios.get(
          `https://api.spacexdata.com/v4/crew/${val}`
        );

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const image = document.createElement('img');
        image.classList.add('card-img-top');
        image.setAttribute('src', response.data.image);

        const groupCardBody = document.createElement('div');
        groupCardBody.classList.add('card-body');

        const groupCardName = document.createElement('h5');
        groupCardName.classList.add('card-title');
        groupCardName.innerText = response.data.name;

        const groupCardAgency = document.createElement('h6');
        groupCardAgency.classList.add('card-title');
        groupCardAgency.innerText = `Agency: ${response.data.agency}`;

        cardDiv.append(image);
        groupCardBody.append(groupCardName);
        groupCardBody.append(groupCardAgency);
        cardDiv.append(groupCardBody);

        cardGroup.append(cardDiv);
      });
      const cardGroup = document.createElement('div');
      cardGroup.classList.add('card-group');
      cardBody.append(cardGroup);
    }
  }
}

getCrewedMissions();

const countdown = (time, id) => {
  const countDownDate = new Date(time);
  const placeholder = document.createElement('h3');
  placeholder.setAttribute('id', 'countdown');

  let x = setInterval(function () {
    let now = Math.round(new Date().getTime() / 1000);
    let distance = countDownDate - now;

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(distance * 1000);
    // days part from timestamp:
    let days = Math.floor(distance / 86400);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = '0' + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = '0' + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = `${days} D : ${hours} H : ${minutes.substr(
      -2
    )} M : ${seconds.substr(-2)} SS`;

    const countD = document.querySelector(`#${id}`);
    countD.innerText = formattedTime;

    // appendTo.append(placeholder);
    if (distance < 0) {
      clearInterval(x);
      countD.innerText = 'launched';
    }
  }, 1000);
};

getNextLaunch();

// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 500);

ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();
