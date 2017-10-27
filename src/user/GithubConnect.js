import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthenticatedUser } from '../reducers';
import { Icon } from 'antd';
import * as querystring from 'querystring';
import { createGithubUser } from '../actions/user';

import GithubBtn from '../components/Button/Github';

import './GithubConnect.less';

@connect(state => ({
  user: getAuthenticatedUser(state),
}), {
  createGithubUser,
})
export default class GithubConnect extends React.Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    user: {},
  };

  constructor (props) {
    super (props);

    this.state = {
      somethingWrong: false,
    }
  }

  componentDidMount() {
    const { location, createGithubUser, user, history } = this.props;
    const params = querystring.decode(location.search.replace('?', ''));
    const { code, state } = params;

    if (user && user.name) {
      createGithubUser(user.name, code, state).then(res => {
        if (res.response && res.response.account) {
          history.push(`/@${user.name}/projects`);
          return;
        } else {
          this.setState({
            somethingWrong: true
          })
        }
      })
    }
  }

  render() {
    const user = this.props;

    if (!user) return null;

    return (
      <div className="GithubConn">
        <div className="shifted">
          <div className="feed-layout container">
            <div className="GithubConn__connecting center">
              <h2><Icon type="github"/> Github + Utopian = <Icon type="heart" /> </h2>
              {!this.state.somethingWrong && <p>
                <Icon type="loading"/> Connecting..
              </p>}
              {this.state.somethingWrong && <div>
                <p>Something went wrong. Try again</p>
                <GithubBtn/>
              </div>}
            </div>
          </div>

        </div>
      </div>
    );
  }
}
