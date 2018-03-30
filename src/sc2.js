/**
 * Proxies SteemConnect calls to the Utopian API. Functions are derived from the
 * sc2 sdk with slight modifications to be compatible with the API.
 */
import Cookie from 'js-cookie';
import request from 'superagent';
import fetch from 'cross-fetch';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SDKError = function (_Error) {
  _inherits(SDKError, _Error);

  function SDKError(message, obj) {
    _classCallCheck(this, SDKError);

    var _this = _possibleConstructorReturn(this, (SDKError.__proto__ || Object.getPrototypeOf(SDKError)).call(this, message));

    _this.name = 'SDKError';
    _this.error = obj.error;
    _this.error_description = obj.error_description;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }
    return _this;
  }

  return SDKError;
}(Error);

function getLoginUrl(state) {
  const host = process.env.STEEMCONNECT_HOST;
  const auth = `${host}/oauth2/authorize`;

  const url = encodeURIComponent(process.env.STEEMCONNECT_REDIRECT_URL);
  const redirect = `redirect_uri=${url}`;

  const response = 'response_type=code';
  const utopianAppId = process.env.UTOPIAN_APP || 'utopian.app';
  const clientId = `client_id=${utopianAppId}`;
  state = `state=${state ? encodeURIComponent(state) : ''}`;
  const scopes = [
    'vote',
    'comment',
    'comment_delete',
    'comment_options',
    'custom_json',
    'claim_reward_balance',
    'offline'
  ].join(',');
  const scope = `scope=${encodeURIComponent(scopes)}`;
  return `${auth}?${clientId}&${response}&${redirect}&${state}&${scope}`;
}

function send(route, method, body, cb) {
  var url = process.env.STEEMCONNECT_HOST + '/api/' + route;
  const accessToken = Cookie.get('access_token');
  var promise = fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: accessToken
    },
    body: JSON.stringify(body)
  }).then(function (res) {
    var json = res.json();
    // If the status is something other than 200 we need
    // to reject the result since the request is not considered as a fail
    if (res.status !== 200) {
      return json.then(function (result) {
        return Promise.reject(new SDKError('sc2-sdk error', result));
      });
    }
    return json;
  }).then(function (res) {
    if (res.error) {
      return Promise.reject(new SDKError('sc2-sdk error', res));
    }
    return res;
  });

  if (!cb) return promise;

  return promise.then(function (res) {
    return cb(null, res);
  }).catch(function (err) {
    return cb(err, null);
  });
};

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
                .send({user_metadata: metadata})
                .set('session', session)
                .then(res => res.body);
}

function broadcast(operations, cb) {
  const endpoint = process.env.UTOPIAN_API + 'sc2/broadcast';
  const session = Cookie.get('session');

  if (!cb) {
    return request.post(endpoint)
                  .send({ operations })
                  .set('session', session)
                  .then(res => res.body);
  } else {
    return request.post(endpoint)
                  .send({ operations })
                  .set('session', session)
                  .then(function (ret) {
                        if (ret.error) {
                          cb(new SDKError('sc2-sdk error', result), null);
                        } else {
                          cb(null, ret);
                        }
                      }, function (err) {
                        return cb(new SDKError('sc2-sdk error', result), null);
                      });
  }
}

function claimRewardBalance(account, rewardSteem, rewardSbd, rewardVests, cb) {
  var params = {
    account: account,
    reward_steem: rewardSteem,
    reward_sbd: rewardSbd,
    reward_vests: rewardVests
  };
  return broadcast([['claim_reward_balance', params]], cb);
};

function updateUserMetadata(metadata, cb) {
  metadata = metadata !== undefined && metadata.length > 0 ? metadata : {};
  return send('me', 'PUT', { user_metadata: metadata }, cb);
};

function me(cb) {
  return send('me', 'POST', {}, cb);
};

function vote(voter, author, permlink, weight) {
  const params = {
    voter,
    author,
    permlink,
    weight,
  };
  return broadcast([['vote', params]]);
}

function comment(parentAuthor, parentPermlink, author,
                  permlink, title, body, jsonMetadata) {
  const params = {
    parent_author: parentAuthor,
    parent_permlink: parentPermlink,
    author,
    permlink,
    title,
    body,
    json_metadata: JSON.stringify(jsonMetadata),
  };
  return broadcast([['comment', params]]);
};

function reblog(account, author, permlink) {
  const params = {
    required_auths: [],
    required_posting_auths: [account],
    id: 'follow',
    json: JSON.stringify([
      'reblog',
      {
        account,
        author,
        permlink,
      },
    ]),
  };
  return broadcast([['custom_json', params]]);
}

function follow(follower, following) {
  const params = {
    required_auths: [],
    required_posting_auths: [follower],
    id: 'follow',
    json: JSON.stringify(['follow', { follower, following, what: ['blog'] }]),
  };
  return broadcast([['custom_json', params]]);
}

function unfollow(unfollower, unfollowing) {
  const params = {
    required_auths: [],
    required_posting_auths: [unfollower],
    id: 'follow',
    json: JSON.stringify(['follow', { follower: unfollower, following: unfollowing, what: [] }]),
  };
  return broadcast([['custom_json', params]]);
}

function sign(name, params, redirectUri) {
  const host = process.env.STEEMCONNECT_HOST;
  let url = `${host}/sign/${name}?`;
  url += Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
  url += redirectUri ? `&redirect_uri=${encodeURIComponent(redirectUri)}` : '';
  return url;
};

module.exports = {
  getLoginUrl,
  send,
  me,
  sign,
  profile,
  updateMetadata,
  broadcast,
  updateUserMetadata,
  claimRewardBalance,
  comment,
  vote,
  reblog,
  follow,
  unfollow
};
