const submitBtn = document.getElementById('submit');
const googleBtn = document.getElementById('google');
const username = document.getElementById('username');
const password = document.getElementById('password');
const statusBox = document.getElementById('status');
const jwtCheck = document.getElementById('jwt');
const form = document.getElementById('form');

let bearerToken = '';

jwtCheck.addEventListener('change', (event) => {
  const { checked } = event.target;

  // If JWT selected
  if (checked) form.setAttribute('action', '/auth/jwt/login');
  else {
    statusBox.setAttribute('hidden', 'true');
    form.setAttribute('action', '/auth/local/login');
  }
});

submitBtn.addEventListener('click', (event) => {
  if (jwtCheck.checked) {
    event.preventDefault();

    loginWithJWT({ username: username.value, password: password.value });
  }
});

submitBtn.addEventListener('click', (event) => {
  window.location.replace('/auth/google');
});

const loginWithJWT = (user) => {
  statusBox.removeAttribute('hidden');

  fetch('http://localhost:9000/auth/jwt/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: username.value, password: password.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      const { token } = data;

      bearerToken = token;
      setStatusBox(data);
    });
};

const setStatusBox = (content) => {
  const contentType = typeof content;

  if (contentType === 'object') statusBox.innerHTML = JSON.stringify(content, null, 2);
  else statusBox.innerHTML = content;
};
