async function getDateAndTime() {
  const response = await axios.get(
    'https://api.spacexdata.com/v4/launches/next'
  );
  console.log(response);
  const dateAndTime = response.data.date_utc;
  const date = dateAndTime.slice(0, 10);
  const time = dateAndTime.slice(11, dateAndTime.length - 1);

  const launchDate = document.querySelector('#launch-date');
  const launchTime = document.querySelector('#launch-time');
  const missionName = document.querySelector('#mission-name');

  launchDate.innerText = `Date: ${date}`;
  launchTime.innerText = `UTC time: ${time}`;
  missionName.innerText = `Mission name: ${response.data.name}`;

  countdown(response.data.date_unix);
}

function countdown(time) {
  const countDownDate = new Date(time);
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
    const formattedTime = `${days} days, ${hours} hours, ${minutes.substr(
      -2
    )} minutes and ${seconds.substr(-2)} seconds`;
    const countD = document.querySelector('#countdown');
    countD.innerText = formattedTime;

    if (distance < 0) {
      clearInterval(x);
      countD.innerText = 'launched';
    }
  }, 1000);
}

getDateAndTime();
