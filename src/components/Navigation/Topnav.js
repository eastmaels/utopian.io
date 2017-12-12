import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Menu, Popover, Tooltip, Input, Badge, Select } from 'antd';
import Action from '../Button/Action';

import { getGithubRepos, setGithubRepos } from '../../actions/projects';
import sc2 from '../../sc2';

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
    repos: state.repos,
  }),
  { getGithubRepos, setGithubRepos },
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
    if (location.pathname.indexOf('search/blog') > -1) return 'blog';

    const which = location.pathname.substring(1); 
    if (which === 'all' || which === '/all') return 'projects';
    if (location.pathname.split('/').length != 1 && this.inValidPaths(which)) {
      return which;
    }
    return false;
  };

  inValidPaths(x) {
    const validPaths = [
      'projects',
      'ideas',
      'sub-projects',
      'development',
      'bug-hunting',
      'translations',
      'graphics',
      'analysis',
      'social',
      'documentation',
      'tutorials',
      'video-tutorials',
      'copywriting',
      'blog',
      ''
    ]
    return validPaths.includes(x);
  }

  handleChangeSearchType(section) {
    const { history } = this.props;
    this.setState({ searchSection: section });

    // Only change path if we are on a 1st level url of one of the valid paths
    if (this.inValidPaths(history.location.pathname.substring(1))
      && history.location.pathname.split('/').length != 1) {
      if (section === 'projects') section = 'all';
      history.push(`/${section}`);
    }
  }


  constructor (props) {
    super(props)
    this.renderItems = this.renderItems.bind(this);
    this.searchSelected = this.searchSelected.bind(this);
    this.handleChangeSearchType = this.handleChangeSearchType.bind(this);
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
      <div className="Search SearchSelector">

        <InputGroup className="SearchSelector" compact>
          <Select className="SearchSelector" defaultValue={this.searchSelected(location) || 'projects'} onChange={this.handleChangeSearchType}>
            <Option className="SearchSelector" value="projects"><Icon type="github" className="SearchSelectorGit iconfont icon-search" /> Projects</Option>
            <Option value="ideas"><CategoryIcon className="SearchSelector" type="ideas"/> Suggestions</Option>
            <Option value="sub-projects"><CategoryIcon className="SearchSelector" type="sub-projects"/> Sub-Projects</Option>
            <Option value="development"><CategoryIcon className="SearchSelector" type="development"/> Code</Option>
            <Option value="bug-hunting"><CategoryIcon className="SearchSelector" type="bug-hunting"/> Bugs</Option>
            <Option value="translations"><CategoryIcon className="SearchSelector" type="translations"/> Translations</Option>
            <Option value="graphics"><CategoryIcon className="SearchSelector" type="graphics"/> Graphics</Option>
            <Option value="analysis"><CategoryIcon className="SearchSelector" type="analysis"/> Analysis</Option>
            <Option value="social"><CategoryIcon className="SearchSelector" type="social"/> Visibility</Option>
            <Option value="documentation"><CategoryIcon className="SearchSelector" type="documentation"/> Docs</Option>
            <Option value="tutorials"><CategoryIcon className="SearchSelector" type="tutorials"/> Tutorials</Option>
            <Option value="video-tutorials"><CategoryIcon className="SearchSelector" type="video-tutorials"/> Video Tuts</Option>
            <Option value="copywriting"><CategoryIcon className="SearchSelector" type="copywriting"/> Copy</Option>
            <Option value="blog"><CategoryIcon className="SearchSelector" type="blog"/> Blogs</Option>
          </Select>
          <Input
            ref={input => this.searchInput = input}
            placeholder="Search..."
            onKeyPress={(event) => {
              const q = event.target.value;
              const searchSection = this.state.searchSection;

              if (event.key === 'Enter') {
                history.push(`/search/${searchSection}/${q}`);
              }
            }}
            className="searchBar"
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
      repos,
      getGithubRepos,
      setGithubRepos,
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
            <Menu.Item key="write" className="Topnav__item-write-new nobottom">
              <Action primary={true} cozy={true} style={{ margin: '3px 0' }} 
              text={
              // <Tooltip placement="bottom" title={<span><a href="/write" style={{color: "white"}}>Write a new Contributor Report</a></span>}>
                <Link to="/write" className="Topnav__newReport">
                  <span style={{textDecoration: "none"}}><i className="iconfont icon-add"/> <span className="Topnav__newReport_texts">Contribution</span></span>
                </Link>
              // </Tooltip>
              }
              onclick={() => {window.location.href="/write"}}
              />
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
            <Menu.Item className="UWhite" key="more">
              <Popover
                className="TopPopover"
                placement="bottom"
                trigger="click"
                content={
                  <PopoverMenu onSelect={onMenuItemClick} className="TopPopover">
                    <PopoverMenuItem key="new-contribution">
                      New Contribution
                    </PopoverMenuItem>
                    <PopoverMenuItem key="new-blog-post">
                      New Blog Post
                    </PopoverMenuItem>
                    <PopoverMenuItem key="activity">
                      Activity
                    </PopoverMenuItem>
                    <PopoverMenuItem key="bookmarks">
                      Bookmarks
                    </PopoverMenuItem>
                    <PopoverMenuItem key="drafts">
                      Drafts
                    </PopoverMenuItem>
                    <PopoverMenuItem key="settings">
                      Settings
                    </PopoverMenuItem>
                    <PopoverMenuItem key="logout">
                      Logout
                    </PopoverMenuItem>
                  </PopoverMenu>
                }
              >
                <a className="Topnav__whitelink Topnav__whitelink--light">
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
            <Menu.Item key="signup" className="UWhite">
              <a target="_blank" rel="noopener noreferrer" className="UWhite" href="https://steemit.com/pick_account">
                <FormattedMessage id="signup" className="UWhite" defaultMessage="Sign up"/>
              </a>
            </Menu.Item>
            <Menu.Item key="divider" className="UWhite" disabled>
              |
            </Menu.Item>
            <Menu.Item className="UWhite" key="login">
              <a href={sc2.getLoginUrl(next)} className="UWhite">
                <FormattedMessage id="login" className="UWhite" defaultMessage="Log in"/>
              </a>
            </Menu.Item>
          </Menu>
        </div>
      );
    }

    const logoSource = () => {
      const prefix = "https://raw.githubusercontent.com/utopian-io/utopian.io/new-design/assets";
      // should be prefix = ""; (this is just testing)
      if (window.innerWidth > 736) {
        return `${prefix}/img/utopian-logo.png`;
      } else {
        return `${prefix}/img/utopian-sole.png`;
      }
    }

    return (
      <div>
        <div className="Topnav">
          <div className="topnav-layout container">
            <div className="left">
              <Link className="Topnav__brand" to="/">
                <img id="MainLogo" src={logoSource()}/>
              </Link>
              <span className="Topnav__version"></span>
            </div>
            <div className="center">
              <div className="Topnav__input-container nomobile">
                { this.renderSearch() }
              </div>
            </div>
            <div className="right">
              {content}
            </div>
          </div>
        </div>
        <div className="Searchmobile yesmobile">
          { this.renderSearch() }
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
