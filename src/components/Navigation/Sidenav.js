import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import './Sidenav.less';

const isActive = (item, match, location) => location.pathname === item;

const Sidenav = ({ username }) =>
  (<div>
    {username &&
      <ul className="Sidenav">
        <li>
          <NavLink to={`/@${username}`} activeClassName="Sidenav__item--active">
            <i className="iconfont icon-mine" />
            My profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/', match, location)}>
            <i className="iconfont icon-headlines" />
            Contributions
          </NavLink>
        </li>
        <li>
          <NavLink to="/all/review" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/all/review', match, location)}>
            <i className="iconfont icon-warning" />
            Review
          </NavLink>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href={`https://steemit.com/@${username}/transfers`}>
            <i className="iconfont icon-wallet" />
            Wallet
          </a>
        </li>
        <li>
          <NavLink to="/sponsors" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/sponsors', match, location)}>
            <Icon type="heart" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
            Sponsors
          </NavLink>
        </li>
        <li>
          <NavLink to="/moderators" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/moderators', match, location)}>
            <Icon type="safety" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
            Moderators
          </NavLink>
        </li>
      </ul>}
  </div>);

Sidenav.propTypes = {
  username: PropTypes.string,
};

Sidenav.defaultProps = {
  username: undefined,
};

export default Sidenav;
