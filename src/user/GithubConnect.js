import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthenticatedUser } from '../reducers';
import { Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import * as querystring from 'querystring';
import { createUser } from '../actions/user';

import GithubBtn from '../components/Button/Github';

import './GithubConnect.less';

@connect(state => ({
  user: getAuthenticatedUser(state),
}), {
  createUser,
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
      componentMounted: false,
      userFound: false,
      userCreated: false,
      fullSuccess: false,
    }
  }

  componentDidMount() {
    this.setState({componentMounted: true});
    const { location, createUser, user, history } = this.props;
    const params = querystring.decode(location.search.replace('?', ''));
    const { code, state } = params;

    if (user && user.name) {
      this.setState({userFound: true});
      createUser(user.name, code, state).then(res => {
        this.setState({userCreated: true});
        if (res.response && res.response.account) {
          this.setState({fullSuccess: true});
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
              {!this.state.somethingWrong && <span><p>
                <Icon type="loading"/> &nbsp;Connecting to Github<br/>
              </p>
              <h5>Watch the progress below:</h5>
              </span>}
              {this.state.somethingWrong && <div>
                <p>Something went wrong. Try again below:</p>
                <GithubBtn/>
              </div>}
              <br/><br/>
              <h6>Connection Started</h6> {(this.state.componentMounted) ? <Icon type="check-circle"/> : <Icon type="close-circle"/>}
              <h6>Utopian User Found</h6> {(this.state.userFound) ? <Icon type="check-circle"/> : <Icon type="close-circle"/>}
              <h6>Github Connection Attempted</h6> {(this.state.userCreated) ? <Icon type="check-circle"/> : <Icon type="loading"/>}
              <h6>Github Connection Established</h6> {(this.state.fullSuccess) ? <Icon type="check-circle"/> : <Icon type="loading"/>}
              {!this.state.somethingWrong && <span>
                <br/> 
                <h5> You will be redirected to your projects soon...</h5>
                </span>}
            </div>
          </div>

        </div>
      </div>
    );
  }
}
