import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Menu, Popover, Tooltip, Input, Badge, Select } from 'antd';
import steemconnect from 'sc2-sdk';

import { getProjects, setProjects } from '../../actions/projects';

import Icon from 'antd/lib/icon';
import Autocomplete from 'react-autocomplete';
import Avatar from '../Avatar';
import Notifications from './Notifications/Notifications';
import PopoverMenu, { PopoverMenuItem } from '../PopoverMenu/PopoverMenu';

import CategoryIcon from '../CategoriesIcons';
import './Topnav.less';

const InputGroup = Input.Group;
const Option = Select.Option;

@connect(
  state => ({
    projects: state.projects,
  }),
  { getProjects, setProjects },
)
class Topnav extends React.Component {

  state = {
    value: '',
    loading: false,
    loaded: false,
  };

  searchSelected(location) {
    if (location.pathname.indexOf('search/projects') > -1) return 'projects';
    if (location.pathname.indexOf('search/ideas') > -1) return 'ideas';
    if (location.pathname.indexOf('search/development') > -1) return 'development';
    if (location.pathname.indexOf('search/bug-hunting') > -1) return 'bug-hunting';
    if (location.pathname.indexOf('search/translations') > -1) return 'translations';
    if (location.pathname.indexOf('search/graphics') > -1) return 'graphics';
    if (location.pathname.indexOf('search/documentation') > -1) return 'documentation';
    if (location.pathname.indexOf('search/analysis') > -1) return 'analysis';
    if (location.pathname.indexOf('search/social') > -1) return 'social';
    return false;
  };

  constructor (props) {
    super(props)
    this.renderItems = this.renderItems.bind(this);
    this.searchSelected = this.searchSelected.bind(this);
    this.state = {
      searchSection: this.searchSelected(props.location) || 'projects',
    };
  }

  renderItems(items) {
    return items;
  }

  renderSearch () {
    const { history, location } = this.props;

    return (
      <div className="Search">

        <InputGroup compact>
          <Select defaultValue={this.searchSelected(location) || 'projects'} onChange={(section) => this.setState({searchSection: section})}>
            <Option value="projects"><Icon type="github" className="iconfont icon-search" /> Projects</Option>
            <Option value="ideas"><CategoryIcon type="ideas"/> Ideas</Option>
            <Option value="development"><CategoryIcon type="development"/> Code</Option>
            <Option value="bug-hunting"><CategoryIcon type="bug-hunting"/> Bugs</Option>
            <Option value="translations"><CategoryIcon type="translations"/> Translations</Option>
            <Option value="graphics"><CategoryIcon type="graphics"/> Graphics</Option>
            <Option value="documentation"><CategoryIcon type="documentation"/> Docs</Option>
            <Option value="analysis"><CategoryIcon type="analysis"/> Analysis</Option>
            <Option value="social"><CategoryIcon type="social"/> Visibility</Option>
          </Select>
          <Input
            ref={input => this.searchInput = input}
            placeholder="Search.."
            onKeyPress={(event) => {
              const q = event.target.value;
              const searchSection = this.state.searchSection;

              if (event.key === 'Enter') {
                history.push(`/search/${searchSection}/${q}`);
              }
            }}
          />
        </InputGroup>

      </div>
    )}

  render() {
    const {
      intl,
      username,
      onNotificationClick,
      onSeeAllClick,
      onMenuItemClick,
      notifications,
      projects,
      getProjects,
      setProjects,
      history,
    } = this.props;

    let content;

    const notificationsCount =
      notifications && notifications.filter(notification => !notification.read).length;

    const next = window !== undefined && window.location.pathname.length > 1 ? window.location.pathname : '';

    if (username) {
      content = (
        <div className="Topnav__menu-container">
          <Menu selectedKeys={[]} className="Topnav__menu-container__menu" mode="horizontal">
            <Menu.Item key="write" className="Topnav__item-write">
              <Tooltip placement="bottom" title='Write a new Contributor Report'>
                <Link to="/write" className="Topnav__newReport">
                  <span><i className="iconfont icon-add"/> <span className="Topnav__newReport_text">Contribution</span></span>
                </Link>
              </Tooltip>
            </Menu.Item>
            <Menu.Item key="user" className="Topnav__item-user">
              <Link className="Topnav__user" to={`/@${username}`}>
                <Avatar username={username} size={36}/>
                {/*<span className="Topnav__user__username">
                 {username}
                 </span>*/}
              </Link>
            </Menu.Item>
            {/*<Menu.Item
             key="notifications"
             className="Topnav__item--badge"
             >
             <Tooltip placement="bottom"
             title={intl.formatMessage({id: 'notifications', defaultMessage: 'Notifications'})}>
             <Popover
             placement="bottomRight"
             trigger="click"
             content={
             <Notifications
             notifications={notifications}
             onClick={onNotificationClick}
             onSeeAllClick={onSeeAllClick}
             />
             }
             title={intl.formatMessage({id: 'notifications', defaultMessage: 'Notifications'})}
             >
             <a className="Topnav__link Topnav__link--light">
             <Badge count={notificationsCount}>
             <i className="iconfont icon-remind"/>
             </Badge>
             </a>
             </Popover>
             </Tooltip>
             </Menu.Item>*/}
            <Menu.Item key="more">
              <Popover
                placement="bottom"
                trigger="click"
                content={
                  <PopoverMenu onSelect={onMenuItemClick}>
                    <PopoverMenuItem key="activity">
                      <FormattedMessage id="activity" defaultMessage="Activity"/>
                    </PopoverMenuItem>
                    <PopoverMenuItem key="bookmarks">
                      <FormattedMessage id="bookmarks" defaultMessage="Bookmarks"/>
                    </PopoverMenuItem>
                    <PopoverMenuItem key="drafts">
                      <FormattedMessage id="drafts" defaultMessage="Drafts"/>
                    </PopoverMenuItem>
                    <PopoverMenuItem key="settings">
                      <FormattedMessage id="settings" defaultMessage="Settings"/>
                    </PopoverMenuItem>
                    <PopoverMenuItem key="logout">
                      <FormattedMessage id="logout" defaultMessage="Logout"/>
                    </PopoverMenuItem>
                  </PopoverMenu>
                }
              >
                <a className="Topnav__link Topnav__link--light">
                  <i className="iconfont icon-switch"/>
                </a>
              </Popover>
            </Menu.Item>
          </Menu>
        </div>
      );
    } else {
      content = (
        <div className="Topnav__menu-container">
          <Menu className="Topnav__menu-container__menu" mode="horizontal">
            <Menu.Item key="signup">
              <a target="_blank" rel="noopener noreferrer" href="https://steemit.com/pick_account">
                <FormattedMessage id="signup" defaultMessage="Sign up"/>
              </a>
            </Menu.Item>
            <Menu.Item key="divider" disabled>
              |
            </Menu.Item>
            <Menu.Item key="login">
              <a href={steemconnect.getLoginURL(next)}>
                <FormattedMessage id="login" defaultMessage="Log in"/>
              </a>
            </Menu.Item>
          </Menu>
        </div>
      );
    }

    return (
      <div>
        <div className="Topnav">
          <div className="topnav-layout container">
            <div className="left">
              <Link className="Topnav__brand" to="/">
                <img src="/img/utopian-logo-120x120.png"/>
              </Link>
            </div>
            <div className="center">
              <div className="Topnav__input-container">
                { window.outerWidth > 736 && this.renderSearch() }
              </div>
            </div>
            <div className="right">
              {content}
            </div>
          </div>
        </div>
        <div className="Searchmobile">
          { window.outerWidth <= 736 && this.renderSearch() }
        </div>
      </div>
    );
  }
}

Topnav.propTypes = {
  intl: PropTypes.shape().isRequired,
  username: PropTypes.string,
  onNotificationClick: PropTypes.func,
  onSeeAllClick: PropTypes.func,
  onMenuItemClick: PropTypes.func,
  notifications: PropTypes.arrayOf(PropTypes.shape()),
  history: PropTypes.shape().isRequired,
};

Topnav.defaultProps = {
  username: undefined,
  onNotificationClick: () => {},
  onSeeAllClick: () => {},
  onMenuItemClick: () => {},
  notifications: [],
};

export default injectIntl(Topnav);
