import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import CategoryIcon from "../CategoriesIcons/index";
import './Sidenav.less';

const isActive = (item, match, location) => location.pathname === item;
const isWallet = (match, location) => location.pathname.match(/wallet/);

const Sidenav = ({ username }) =>
  (<div>
    {username &&
      <ul className="Sidenav" style={{listStyleType: 'none'}}>
        <li>
          <NavLink to={`/@${username}`} activeClassName="Sidenav__item--active">
            <i className="iconfont icon-mine" />
            My profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/wallet" activeClassName="Sidenav__item--active" isActive={isWallet}>
            <i className="iconfont icon-wallet" />
            <FormattedMessage id="wallet" defaultMessage="Wallet" />
          </NavLink>
        </li>
      </ul>
    }
    <ul className="Sidenav" style={{listStyleType: 'none'}}>
      <li>
        <NavLink to="/" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/', match, location)}>
          <i className="iconfont icon-headlines" />
          Contributions
        </NavLink>
      </li>
      {username &&
        <li>
          <NavLink to="/write" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/write', match, location)}>
            <Icon type="plus" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
            New Contribution
          </NavLink>
        </li>
      }
    </ul>
    <ul className="Sidenav" style={{listStyleType: 'none'}}>
      <li>
        <NavLink to={`/tasks`} activeClassName="Sidenav__item--active">
          <Icon type="notification" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
          Task Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/blog', match, location)}>
          <CategoryIcon from="from-sidenav" type="blog" style={{'margin-left': '10px', 'verticalAlign': 'middle', 'fontSize': '22px',}}/>
          Blog Posts
        </NavLink>
      </li>
      {username &&
        <li>
          <NavLink to="/all/review" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/all/review', match, location)}>
            <i className="iconfont icon-warning"/>
            Review
          </NavLink>
        </li>
      }
    </ul>
    <ul className="Sidenav" style={{listStyleType: 'none'}}>
      <li>
        <NavLink to="/faq" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/faq', match, location)}>
          <Icon type="question" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
          FAQ
        </NavLink>
      </li>
      <li>
        <NavLink to="/rules" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/rules', match, location)}>
          <Icon type="copy" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
          Rules
        </NavLink>
      </li>
      {username &&
      <li>
        <NavLink to="/sponsors" activeClassName="Sidenav__item--active"
                 isActive={(match, location) => isActive('/sponsors', match, location)}>
          <Icon type="heart" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
          Sponsors
        </NavLink>
      </li>
      }
      {username &&
      <li>
        <NavLink to="/moderators" activeClassName="Sidenav__item--active"
                 isActive={(match, location) => isActive('/moderators', match, location)}>
          <Icon type="safety" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
          Moderators
        </NavLink>
      </li>
      }
      <li>
        <NavLink to="/tos" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/tos', match, location)}>
          <Icon type="flag" style={{ 'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px' }} />
          Terms of Service
        </NavLink>
      </li>
      <li>
        <NavLink to="/privacy" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/privacy', match, location)}>
          <Icon type="flag" style={{ 'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px' }} />
          Privacy Policy
        </NavLink>
      </li>
    </ul>

  </div>);

Sidenav.propTypes = {
  username: PropTypes.string,
};

Sidenav.defaultProps = {
  username: undefined,
};

export default Sidenav;
