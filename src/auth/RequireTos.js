import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './authActions';
import { getIsAuthFetching, getIsAuthenticated, getAuthenticatedUser, stats, getAuthenticatedUserName } from '../reducers';
import { getStats } from "../actions/stats";
import { acceptTOS, acceptPrivacyPolicy, getUser } from "../actions/user";
import { Modal, Input } from 'antd';
import TOSText from "../statics/TOS";
import PrivacyPolicyText from "../statics/PrivacyPolicy";
import Cookies from "js-cookie";


@connect((state, ownProps) => ({
  fetching: getIsAuthFetching(state),
  authenticated: getIsAuthenticated(state),
  user: getAuthenticatedUser(state),
  username: getAuthenticatedUserName(state),
}), {
  getStats, acceptPrivacyPolicy, acceptTOS, logout, getUser
})
export default class RequireTos extends React.Component
{
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    user: PropTypes.shape().isRequired,
    getStats: PropTypes.func.isRequired,
    acceptPrivacyPolicy: PropTypes.func.isRequired,
    acceptTOS: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	getUser: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
  };

  static defaultProps = {
    stats: null,
    tosAccepted: false,
    privacyAccepted: false,
    acceptPrivacyPolicy: () => {},
    acceptTOS: () => {},
	logout: () => {},
	getUser: (account) => {},
  };

  constructor(props)
  {
    super(props);
    this.state = {
      stats: null,
      tosAccepted: false,
      privacyAccepted: false,
      privacyScroll: false,
      TOSScroll: false,
	  modalAcceptPending: false
    };
    const { getStats } = this.props;
    getStats().then( res => {
      this.setState({
        stats: res.response.stats
      });
    })
  }

  
  componentWillMount()
  {
  }

  render()
  {
    const { acceptTOS, acceptPrivacyPolicy, user, fetching, authenticated, username } = this.props;
    let stats = this.state.stats;
	
	if(!user)
		return null;

    if(!stats || !user || !user.account || fetching || !authenticated || username != user.account || !username)
      return null;

    let {tosCookie,privacyCookie} = {tosCookie:Cookies.get('isTOSAccepted') || false, privacyCookie: Cookies.get('isPrivacyAccepted') || false};

    if (tosCookie && privacyCookie) {
      return null;
    }
      
    let lastTOSEdit = new Date(stats.last_date_edit_tos);
    let TOSAgreements = (user.tos || []).filter( aggreement => {
      let aggrementDate = new Date(aggreement.date);
      if(aggrementDate.getTime() < lastTOSEdit.getTime())
        return false;
      return true;
    });
    
    let lastPrivacyEdit = new Date(stats.last_date_edit_privacy);
    let PrivacyAgreements = (user.privacy || []).filter( aggreement => {
      let aggrementDate = new Date(aggreement.date);
      if(aggrementDate.getTime() < lastPrivacyEdit.getTime())
        return false;
      return true;
    });
    
    if(TOSAgreements.length && PrivacyAgreements.length)
      return null;
    
    //console.log("TOSAgreements", TOSAgreements);

    //Load Cookie values


    return (
      <div>
        <Modal
        visible={!TOSAgreements.length && !this.state.tosAccepted}
        title='Terms Of Service'
        okType={(this.state.TOSScroll?'primary':'disabled')}
        okText={(this.state.modalAcceptPending?"Processing...":"Accept")}
        cancelText="Cancel"
		maskClosable={false}
        onCancel={() => {
		      this.props.logout();
        }}
        onOk={() => {
          if(!this.state.TOSScroll)
          {
              return;
          }
		  this.setState({
			  modalAcceptPending: true,
		  });
          
          acceptTOS(username).then( accepted => {
            Cookies.set(
              'isTOSAccepted',
              true,
              {
                expires: 1209600, // ten years from now
                domain: process.env.NODE_ENV === 'development'
                  ? 'localhost'
                  : 'utopian.io',
              },
            );
           
			this.props.getUser(username).then( result => {
				 this.setState({
					tosAccepted: true,
					modalAcceptPending: false,
				});
			});
			
          })
        }}
        >
          <p>Please read and accept the Terms of Service. You must scroll to the bottom to proceed.</p>
          <div style={{height: '300px', width: '100%', background: '#ffffff', overflowY: 'scroll'}} ref={(el) => { this.TOSContainer = el }} onScroll={() => {
			  if(!this.TOSContainer)
			    return;
			  console.log("TOSContainer scrollTop", this.TOSContainer.scrollTop, (this.TOSContainer.scrollHeight - this.TOSContainer.offsetHeight));
              if( this.TOSContainer.scrollTop >= (this.TOSContainer.scrollHeight - this.TOSContainer.offsetHeight) - 100)
              {
				this.state.TOSScroll = true;
                this.setState({
                  TOSScroll: true,
                })
              }
            }} >
            <TOSText />
          </div>

        </Modal>

        <Modal
        visible={!PrivacyAgreements.length && !this.state.privacyAccepted}
        title='Privacy Policy Agreement'
        okType={(this.state.privacyScroll?'primary':'disabled')}
        okText={(this.state.modalAcceptPending?"Processing...":"Accept")}
        cancelText="Cancel"
		maskClosable={false}
        onCancel={() => {
          this.props.logout();
        }}
        onOk={() => {
          if(!this.state.privacyScroll)
          {
              return;
          }
		  this.setState({
			  modalAcceptPending: true,
		  });
          acceptPrivacyPolicy(username).then( accepted => {
            Cookies.set(
              'isPrivacyAccepted',
              true,
              {
                expires: 1209600, // ten years from now
                domain: process.env.NODE_ENV === 'development'
                  ? 'localhost'
                  : 'utopian.io',
              },
            );
			this.props.getUser(username).then( result => {
				 this.setState({
					privacyAccepted: true,
					modalAcceptPending: false,
				});
			});
          })
        }}
        >
          <p>Please read and accept the Privacy Policy Aggreement. You must scroll to the bottom to proceed.</p>
           <div style={{height: '300px', width: '100%', background: '#ffffff', overflowY: 'scroll'}} ref={(el) => { this.PrivacyContainer = el }} onScroll={() => {
			  if(!this.PrivacyContainer)
			  	return;
			  console.log("PrivacyContainer scrollTop", this.PrivacyContainer.scrollTop, (this.PrivacyContainer.scrollHeight - this.PrivacyContainer.offsetHeight));
              if( this.PrivacyContainer.scrollTop >= (this.PrivacyContainer.scrollHeight - this.PrivacyContainer.offsetHeight) - 100)
              {
				this.state.privacyScroll = true;
                this.setState({
                  privacyScroll: true,
                })
              }
            }} >
            <PrivacyPolicyText />
          </div>
        </Modal>
      </div>
    )
  }
}
