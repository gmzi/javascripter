async function login(username, password) {
  const res = await axios.post(
    'https://hack-or-snooze-v3.herokuapp.com/login',
    { user: { username, password } }
  );
  return res.data.token;
}

async function getUsers(qtty) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdtemkiLCJpYXQiOjE2MDk4NjU1Njd9.pxDGi-wguLw76GNVds9Op2vcpfzdbkNkfvZDqgs-_eQ';
  const res = await axios.get(
    `https://hack-or-snooze-v3.herokuapp.com/users?token=${token}`,
    { params: { limit: qtty } }
  );
  console.log(res);
}

getUsers(50);

async function getStories() {
  const res = await axios.get(
    'https://hack-or-snooze-v3.herokuapp.com/stories'
  );
  console.log(res);
}

// getStories();

async function createStory(author, title, url) {
  const token = apis.hackOrSnoozeToken;
  const res = await axios.post(
    'https://hack-or-snooze-v3.herokuapp.com/stories',
    { token: token, story: { author, title, url } }
  );
  console.log(res);
}

createStory('ross', 'friends', 'https://en.wikipedia.org/wiki/Ross_Geller');
