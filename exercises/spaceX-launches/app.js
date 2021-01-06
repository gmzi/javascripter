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
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].crew.length > 0) {
      renderMission(response.data[i], i);
    }
  }
}

function renderMission(response, id) {
  const crewedMissions = document.querySelector('#crewed-missions');
  const name = response.name;
  const date = response.date_local;
  const crewMembers = response.crew;

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
  missionCountdown.setAttribute('id', `crewed-countdown-${id}`);
  missionCountdown.classList.add('btn');
  missionCountdown.classList.add('btn-dark');
  missionCountdown.classList.add('btn-sm');
  missionCountdown.classList.add('d-block');
  countdown(response.date_unix, `crewed-countdown-${id}`);

  // const crewTitle = document.createElement('h4');
  // crewTitle.innerText = 'Crew members';
  // crewTitle.append(missionCountdown);

  missionDate.append(missionCountdown);
  missionName.append(missionDate);
  cardBody.append(missionName);
  missDiv.append(cardBody);
  crewedMissions.append(missDiv);

  crewMembers.forEach(async function (val) {
    const member = await axios.get('https://api.spacexdata.com/v4/crew/' + val);
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.setAttribute('src', member.data.image);

    const groupCardBody = document.createElement('div');
    groupCardBody.classList.add('card-body');

    const groupCardName = document.createElement('h5');
    groupCardName.classList.add('card-title');
    groupCardName.innerText = member.data.name;

    const groupCardAgency = document.createElement('h6');
    groupCardAgency.classList.add('card-title');
    groupCardAgency.innerText = `Agency: ${member.data.agency}`;

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

const countdown = (time, id, timer) => {
  const countDownDate = new Date(time);
  const placeholder = document.createElement('h3');
  placeholder.setAttribute('id', 'countdown');

  let x = setInterval(function () {
    console.log(id);
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
getCrewedMissions();
