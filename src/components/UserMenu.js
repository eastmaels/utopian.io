import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { getModerators } from '../actions/moderators';
import { getIsAuthenticated, getAuthenticatedUser } from '../reducers';

import './UserMenu.less';

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    user: getAuthenticatedUser(state),
    moderators: state.moderators,
  }),
  {
    getModerators,
  },
)
class UserMenu extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    defaultKey: PropTypes.string,
    followers: PropTypes.number,
    following: PropTypes.number,
  };

  static defaultProps = {
    onChange: () => {},
    defaultKey: 'discussions',
    followers: 0,
    following: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: props.defaultKey ? props.defaultKey : 'discussions',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      current: nextProps.defaultKey ? nextProps.defaultKey : 'discussions',
    });
  }

<<<<<<< HEAD
  componentWillMount() {
    const { getModerators, moderators, user } = this.props;
    getModerators();
  }
=======
>>>>>>> 3fdb9b6c527508fd5a28cc8ea413c82d1a46259e

  getItemClasses = key => classNames('UserMenu__item', { 'UserMenu__item--active': this.state.current === key });

  isModerator() {
    const { moderators, user } = this.props;
    return R.find(R.propEq('account', user.name))(moderators);
  }

  handleClick = (e) => {
    const key = e.currentTarget.dataset.key;
    this.setState({ current: key }, () => this.props.onChange(key));
  };

  render() {
    return (
      <div className="UserMenu">
        <div className="container menu-layout">
          <div className="left" />
          <Scrollbars autoHide style={{ width: '100%', height: 46 }}>
            <ul className="UserMenu__menu center">
              <li className={this.getItemClasses('discussions')} onClick={this.handleClick} role="presentation" data-key="discussions">
                <FormattedMessage id="contributions" defaultMessage="Contributions" />
              </li>
              {this.isModerator() &&
              <li className={this.getItemClasses('moderations')} onClick={this.handleClick} role="presentation" data-key="moderations">
                <FormattedMessage id="moderations" defaultMessage="Moderations" /> 
              </li>}
              {/*<li className={this.getItemClasses('comments')} onClick={this.handleClick} role="presentation" data-key="comments">
                <FormattedMessage id="comments" defaultMessage="Comments" />
              </li>*/}
              <li className={this.getItemClasses('projects')} onClick={this.handleClick} role="presentation" data-key="projects">
                Projects
              </li>
              <li className={this.getItemClasses('followers')} onClick={this.handleClick} role="presentation" data-key="followers">
                <FormattedMessage id="followers" defaultMessage="Followers" />
                <span className="UserMenu__badge">
                  <FormattedNumber value={this.props.followers} />
                </span>
              </li>
              <li className={this.getItemClasses('followed')} onClick={this.handleClick} role="presentation" data-key="followed">
                <FormattedMessage id="following" defaultMessage="Following" />
                <span className="UserMenu__badge">
                  <FormattedNumber value={this.props.following} />
                </span>
              </li>
            </ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default UserMenu;
