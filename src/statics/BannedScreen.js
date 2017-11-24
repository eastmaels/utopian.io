import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { createHashHistory } from 'history'
import urlParse from 'url-parse';
import {
    getIsAuthenticated,
    getAuthenticatedUser,
  } from '../reducers';
import { getUser, banUser, getBanUser } from '../actions/user'
import './BannedScreen.less';

export const history = createHashHistory()

@connect(
    state => ({
      authenticated: getIsAuthenticated(state),
      authenticatedUser: getAuthenticatedUser(state),
    }),
    { banUser, getUser, getBanUser },
)
class BannedScreen extends React.Component {

    static propTypes = {
        authenticated: PropTypes.bool.isRequired,
        authenticatedUser: PropTypes.shape().isRequired,
        redirector: PropTypes.bool,
      };
    
      static defaultProps = {
          redirector: false,
      };
    
      constructor(props) {
        super(props);
        this.state = {
            isBanned: 0,
            banReason: "Violation of the Utopian Rules",
        };
      }

  componentWillMount() {
    const { authenticatedUser, getBanUser, getUser } = this.props;
    getBanUser(authenticatedUser.name).then((res) => {
        if (res && res.response && res.response.banReason && (res.response.banReason != "<unknown>")) {
            this.setState({banReason: res.response.banReason});
        }
        if (res && res.response && res.response.banned) {
            this.setState({isBanned: res.response.banned});
        }
    })
  }

  render() {
      console.log("Checking for user ban...");
    if (this.props.redirector === true) {
        console.log("-> redirector mode");
        if (this.state.isBanned == 1) {
            console.log("BANNED, redirecting");
            window.location.href = "/banned";
            return (<span><Icon type="loading"/></span>);
        } else {
            console.log("NOT BANNED, staying");
            return (<span></span>);
        }
    }

  return (<div className="main-panel">
    <div className="mt-5 text-center">
      <h2>
        <center><br/><br/><Icon type="safety" style={{
                  fontSize: '100px',
                  color: 'red',
                  display: 'block',
                  clear: 'both',
                  textAlign: 'center',
                }}/><br/>
                You have been banned from posting on Utopian.</center>
      </h2>

      <p className="container pb-5">
      <b className="BannedScreen_sectitle">
          What can I do?
          </b><br/>

      You will no longer be allowed to <b>post contributions</b> on Utopian. 

      However, you will still be allowed to:
      <ul className="BannedScreen__ul">
      <li>View all Utopian Contributions</li>
      <li>Vote on Utopian Contributions</li>
      <li>Reply/comment to Utopian Contributions</li>
      <li>Access Most of the Utopian Website</li>
      </ul><br/><br/>
      </p>

      <p className="container pb-5">
    <b className="BannedScreen_sectitle">
          Why was I banned?
      </b><br/>
      You were banned by a moderator due to violations of the Utopian Rules. <br/>

      The reason listed for your ban is: <em><code className="BannedScreen__code">{this.state.banReason}</code></em>.<br/>

      Feel free to contact the Utopian Moderators <a href="https://discord.gg/5geMSSZ">on Discord</a> for more information, or if you would like to appeal against your ban.
      </p>  
      
    </div>
  </div>);
  }
}

export default BannedScreen;