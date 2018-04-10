import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, FormattedRelative } from 'react-intl';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { epochToUTC } from '../../../helpers/formatter';
import Avatar from '../../Avatar';
import './Notification.less';

const NotificationReply = ({ notification, currentAuthUsername, read, onClick, isModerator }) => {
  const { permlink, parent_permlink: parentPermlink, author, timestamp } = notification;
  const commentURL = `/utopian-io/@${currentAuthUsername}/${parentPermlink}/#@${author}/${permlink}`;
  return (
    <Link
      to={commentURL}
      onClick={onClick}
      className={classNames('Notification', {
        'Notification--unread': !read,
      })}
    >
      <Avatar username={author} size={40} />
      <div className="Notification__text">
        <div className="Notification__text__message">
          {notification.author === 'utopian-io' ?
            <FormattedMessage
              id="notification_reply_utopianio"
              defaultMessage="{username} commented on your post."
              values={{
                username: <span className="username">{author}</span>,
              }}
            />
          : null}
          { !_.isEmpty(isModerator) ?
            <FormattedMessage
              id="notification_review_utopian_moderator"
              defaultMessage="{username}, a Utopian moderator, reviewed your post."
              values={{
                username: <span className="username">{author}</span>,
              }}
            />
          : null}
        </div>
        <div className="Notification__text__date">
          <FormattedRelative value={epochToUTC(timestamp)} />
        </div>
      </div>
    </Link>
  );
};

NotificationReply.propTypes = {
  read: PropTypes.bool,
  notification: PropTypes.shape({
    author: PropTypes.string,
    permlink: PropTypes.string,
    parent_permlink: PropTypes.string,
    timestamp: PropTypes.number,
  }),
  isModerator: PropTypes.shape(),
  currentAuthUsername: PropTypes.string,
  onClick: PropTypes.func,
};

NotificationReply.defaultProps = {
  read: false,
  notification: {},
  isModerator: {},
  currentAuthUsername: '',
  onClick: () => {},
};

export default NotificationReply;
