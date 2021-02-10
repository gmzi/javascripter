function game() {
  const timeNum = document.querySelector('#time-num');
  const scoreNum = document.querySelector('#score-num');
  form = document.querySelector('form');
  let input = document.querySelector('#word');
  let feedback = document.querySelector('.feedback');
  const btnAgain = document.querySelector('.btn-again button');
  current_score = 0;

  function countDown(number) {
    let sustractor = setInterval(function () {
      number--;
      if (number > 0) {
        timeNum.innerText = number;
      } else {
        clearInterval(sustractor);
        gameDone();
      }
    }, 1000);
  }

  function gameActive() {
    btnAgain.classList.add('hide');
    btnSubmit = document.querySelector('input[type="submit"]');
    let scoreNum = document.querySelector('#score-num');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      checkIfValid(input.value);
      input.value = null;
    });

    async function checkIfValid(word) {
      if (word === '') {
        msg = 'not-a-word';
      } else {
        const response = await axios.get('http://127.0.0.1:5000/server', {
          params: { word: word },
        });
        msg = response.data.result;
      }
      displayFeedback(msg);
      if (msg === 'well done!!') {
        updateScore(word);
      }
    }

    function displayFeedback(message) {
      const display = document.querySelector('.feedback h3');
      display.innerText = message;
    }

    function updateScore(word) {
      current_score += word.length;
      scoreNum.innerText = current_score;
    }
  }

  function gameDone() {
    timeNum.innerText = 'time out';
    scoreNum.innerText = current_score;
    form.classList.add('hide');
    feedback.classList.add('hide');
    sendScore(current_score);
    playAgain();
  }

  async function sendScore(score) {
    const res = await axios.post('http://127.0.0.1:5000/stats', { score });
  }

  function playAgain() {
    btnAgain.classList.remove('hide');
    btnAgain.addEventListener('click', function () {
      location.reload();
    });
  }

  gameActive();
  countDown(60);
}

game();
