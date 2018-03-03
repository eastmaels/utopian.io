import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { getModerators } from '../actions/moderators';
import { getIsAuthenticated, getUser } from '../reducers';

import './UserMenu.less';

@connect(
  (state, ownProps) => ({
    authenticated: getIsAuthenticated(state),
    user: getUser(state, ownProps.match.params.name),
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

  componentWillMount() {
    const { getModerators, moderators, user } = this.props;
    getModerators();
  }

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
    const renderContribution = () => {
      let result;
      if (this.state.current === 'contributions') {
        result = (<li className={this.getItemClasses('contributions')} onClick={this.handleClick} role="presentation" data-key="contributions">
          <FormattedMessage id="contributions" defaultMessage="Contributions" />
        </li>);
      } else {
        result = (<li className={this.getItemClasses('discussions')} onClick={this.handleClick} role="presentation" data-key="discussions">
          <FormattedMessage id="contributions" defaultMessage="Contributions" />
        </li>);
      }
      return result;
    };

    return (
      <div className="UserMenu">
        <div className="container menu-layout">
          <div className="left" />
          <Scrollbars autoHide style={{ width: '100%', height: 46 }}>
            <ul className="UserMenu__menu center">
              {renderContribution()}
              {this.isModerator() &&
              <li className={this.getItemClasses('moderations')} onClick={this.handleClick} role="presentation" data-key="moderations">
                <FormattedMessage id="moderations" defaultMessage="Moderations" />
              </li>}
              {/* <li className={this.getItemClasses('comments')} onClick={this.handleClick} role="presentation" data-key="comments">
                <FormattedMessage id="comments" defaultMessage="Comments" />
              </li> */}
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
              <li
                className={this.getItemClasses('transfers')}
                onClick={this.handleClick}
                role="presentation"
                data-key="transfers"
              >
                <FormattedMessage id="wallet" defaultMessage="Wallet" />
              </li>
            </ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default UserMenu;
