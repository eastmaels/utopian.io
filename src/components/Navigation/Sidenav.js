import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd'; import * as ReactIcon from 'react-icons/lib/md';
import CategoryIcon from "../CategoriesIcons/index";
import './Sidenav.less';

const isActive = (item, match, location) => location.pathname === item;

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
        <br/><hr />
        <li>
          <NavLink to="/" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/', match, location)}>
            <i className="iconfont icon-headlines" />
            Contributions
          </NavLink>
        </li>
        <li>
          <NavLink to="/write" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/write', match, location)}>
            <Icon type="plus" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
            New Contribution
          </NavLink>
        </li>
        <br/><hr />
        <li>
          <NavLink to={`/tasks`} activeClassName="Sidenav__item--active">
            <Icon type="notification" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
            Task Requests
          </NavLink>
        </li>
        <br/><hr />
        <li>
          <NavLink to="/blog" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/blog', match, location)}>
            <CategoryIcon from="from-sidenav" type="blog" style={{'margin-left': '10px', 'verticalAlign': 'middle', 'fontSize': '22px',}}/>
            Blog Posts
          </NavLink>
        </li>
        {/*<li>
          <NavLink to="/write-blog" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/write-blog', match, location)}>
            <Icon type="plus" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
            New Blog Post
          </NavLink>
        </li>*/}
        <br/><hr />
        <li>
          <NavLink to="/all/review" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/all/review', match, location)}>
            <i className="iconfont icon-warning" />
            Review
          </NavLink>
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
        <li>
          <NavLink to="/rules" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/rules', match, location)}>
            <Icon type="copy" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
            Rules
          </NavLink>
        </li>
        <li>
          <NavLink to="/faq" activeClassName="Sidenav__item--active" isActive={(match, location) => isActive('/faq', match, location)}>
            <Icon type="question" style={{'verticalAlign': 'middle', 'fontSize': '22px', 'marginRight': '10px'}}/>
            FAQ
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
