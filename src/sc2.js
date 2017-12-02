import Cookie from 'js-cookie';
import request from 'superagent';

function getLoginUrl(state) {
  const host = process.env.STEEMCONNECT_HOST;
  const auth = `${host}/oauth2/authorize`;

  const url = encodeURIComponent(process.env.STEEMCONNECT_REDIRECT_URL);
  const redirect = `redirect_uri=${url}`;

  const response = 'response_type=code';
  const clientId = `client_id=${encodeURIComponent('utopian.app')}`;
  state = `state=${state ? encodeURIComponent(state) : ''}`;
  return `${auth}?${clientId}&${response}&${redirect}&${state}&scope=`;
}

function profile() {
  const endpoint = process.env.UTOPIAN_API + 'sc2/profile';
  const session = Cookie.get('session');
  return request.post(endpoint).set('session', session).then(res => {
    return res.body;
  });
}

function updateMetadata(metadata) {
  const endpoint = process.env.UTOPIAN_API + 'sc2/profile';
  const session = Cookie.get('session');
  return request.put(endpoint)
                .send(metadata)
                .set('session', session)
                .then(res => {
    return res.body;
  });
}

module.exports = {
  getLoginUrl,
  profile
};
