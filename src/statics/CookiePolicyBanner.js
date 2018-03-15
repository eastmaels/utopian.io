import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'antd/dist/antd';
import './CookiePolicyBanner.less';

@withRouter
export default class CookiePolicyBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCookiePolicyAccepted: Cookies.get('isCookiePolicyAccepted') || false,
    };
  }

  handleAcceptButtonClick = () => {
    this.setState({
      isCookiePolicyAccepted: true,
    });

    Cookies.set(
      'isCookiePolicyAccepted',
      true,
      {
        expires: 3650, // ten years from now
        domain: process.env.NODE_ENV === 'development'
          ? 'localhost'
          : 'utopian.io',
      },
    );
  }

  render() {
    if (this.state.isCookiePolicyAccepted) {
      return null;
    }

    return (
      <div className="CookiePolicyBanner">
        <div>
            To help provide a safer and more optimal experience, we use cookies. By clicking or navigating the site, you agree to allow our collection of information on and off Utopian through cookies. Learn more, including about available controls: <NavLink to="/cookies">Cookies Policy</NavLink><br/>
            If you do not agree with our Cookie Policy, <a href="https://www.google.com">please leave the site</a>.
        </div>
        <a
          className="CookiePolicyBanner__ProceedButton"
          onClick={this.handleAcceptButtonClick}
        >Got it!</a>
      </div>
    );
  }
}
