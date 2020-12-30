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
  const countDownDate = new Date(time).getTime();
  let x = setInterval(function () {
    let now = new Date().getTime();
    let distance = now - countDownDate;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countD = document.querySelector('#countdown');
    countD.innerHTML = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    if (distance < 0) {
      clearInterval(x);
      countD.innerText = 'launched';
    }
  }, 1000);
}

getDateAndTime();
