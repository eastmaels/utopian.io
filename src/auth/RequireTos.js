import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getIsAuthFetching, getIsAuthenticated, getAuthenticatedUser, stats } from '../reducers';
import { getStats } from "../actions/stats";
import { acceptTOS, acceptPrivacyPolicy } from "../actions/user";
import Loading from '../components/Icon/Loading';
import Error401 from '../statics/Error401';
import Help from '../statics/Help';
import { Modal, Input } from 'antd';
import TOSText from "../TOS";
import PrivacyPolicyText from "../PrivacyPolicy";

@connect((state, ownProps) => ({
  fetching: getIsAuthFetching(state),
  authenticated: getIsAuthenticated(state),
  user: getAuthenticatedUser(state),
}), {
  getStats, acceptPrivacyPolicy, acceptTOS
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
  };

  static defaultProps = {
    stats: null,
    tosAccepted: false,
    privacyAccepted: false,
    acceptPrivacyPolicy: () => {},
    acceptTOS: () => {},
  };

  constructor(props)
  {
    super(props);
    this.state = {
      stats: null,
      tosAccepted: false,
      privacyAccepted: false,
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
    const { acceptTOS, acceptPrivacyPolicy, user, fetching, authenticated } = this.props;
    let stats = this.state.stats;
  
    if(!authenticated)
      return null;

    if(!stats || !user || !user.account || fetching)
      return null;
      
    console.log("user,", user, user, fetching)

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
    console.log("TOSAgreements", TOSAgreements, PrivacyAgreements)
    if(TOSAgreements.length && PrivacyAgreements.length)
      return null;
    console.log("Modals rendered.. fuck")
    return (
      <div>
        <Modal
        visible={!TOSAgreements.length && !this.state.tosAccepted}
        title='Terms Of Service'
        okText='Accept'
        cancelText="Cancel"
        onCancel={() => {
          alert("You must accept the Terms of Services in order to use the website!");
          return;
        }}
        onOk={() => {
          this.setState({
            tosAccepted: true
          })
          acceptTOS(user.account);
        }}
        >
          <p>Please read and accept the Terms of Service</p>
          <Input.TextArea readOnly size='large' style={{height: '300px', background: '#ffffff'}}>{TOSText}</Input.TextArea>

        </Modal>

        <Modal
        visible={!PrivacyAgreements.length && !this.state.privacyAccepted}
        title='Privacy Policy Agreement'
        okText='Accept'
        cancelText="Cancel"
        onCancel={() => {
          alert("You must accept our Privacy Policy Agreement to continue use the website!");
        }}
        onOk={() => {
          this.setState({
            privacyAccepted: true
          })
          acceptPrivacyPolicy(user.account);
        }}
        >
          <p>Please read and accept the Privacy Policy Aggreement</p>
          <Input.TextArea readOnly size='large' style={{height: '300px', background: '#ffffff'}}>{PrivacyPolicyText}</Input.TextArea>
        </Modal>
      </div>
    )
  }
}