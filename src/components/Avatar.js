import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.less';

const avatarUrl = (username, size) => {
  const avatar = `${process.env.STEEMCONNECT_IMG_HOST}/@${username || 'steemconnect'}?s=${size}`;

  if(username.indexOf('https') !== -1)
    return username;

  return avatar;
};

const Avatar = ({ username, size }) =>
  (<img
    className="Avatar"
    style={{ minWidth: `${size}px`, width: `${size}px`, height: `${size}px`, borderRadius: `100%` }}
    alt={username}
    src={avatarUrl(username, size)}
  />);

Avatar.propTypes = {
  username: PropTypes.string,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  username: undefined,
  size: 34,
};

export default Avatar;
