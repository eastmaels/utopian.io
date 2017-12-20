const request = require('superagent');

const API = process.env.UTOPIAN_API || "https://api.utopian.io/api/";
const LOGIN_ENDPOINT = API.endsWith('/') ? API : API + '/';

function authCallback(req, res) {
  const code = req.query.code;
  const state = req.query.state;
  const next = state && state[0] === '/' ? state : '/';
  if (code) {
    request.post(LOGIN_ENDPOINT + 'login/steemconnect').send({
      code
    }).then(loginRes => {
      if (loginRes.status !== 200) {
        throw new Error('HTTP ' + loginRes.status + '\n' + loginRes.body);
      }
      res.cookie('session', loginRes.body.session, {
        maxAge: loginRes.body.expiry - Date.now(),
        sameSite: true
      });
      res.redirect(next);
    }).catch(err => {
      console.error('Failed to login to API server', err);
      res.status(500).send({ error: 'Failed to create session' });
    });
  } else {
    res.status(401).send({ error: 'code Missing' });
  }
}

module.exports = authCallback;
