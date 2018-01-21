import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Cookie from 'js-cookie';
import Loading from './components/Icon/Loading';

import { getAuthenticatedUser, getLocale } from './reducers';
import { getReposByGithub } from './actions/projects';
import { getUser } from './actions/user';

import { login, logout } from './auth/authActions';
import { getRate, getRewardFund, getTrendingTopics, getCurrentMedianHistoryPrice } from './app/appActions';
import Topnav from './components/Navigation/Topnav';
import Transfer from './wallet/Transfer';
import * as reblogActions from './app/Reblog/reblogActions';
import getTranslations, { getAvailableLocale } from './translations';

@withRouter
@connect(
  state => ({
    user: getAuthenticatedUser(state),
    locale: getLocale(state),
  }),
  {
    login,
    logout,
    getRate,
    getRewardFund,
    getTrendingTopics,
    getCurrentMedianHistoryPrice,
    getRebloggedList: reblogActions.getRebloggedList,
    getReposByGithub,
    getUser,
  },
)
export default class Wrapper extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    locale: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    history: PropTypes.shape().isRequired,
    login: PropTypes.func,
    logout: PropTypes.func,
    getRebloggedList: PropTypes.func,
    getRate: PropTypes.func,
    getRewardFund: PropTypes.func,
    getTrendingTopics: PropTypes.func,
    getCurrentMedianHistoryPrice: PropTypes.func,
  };

  static defaultProps = {
    login: () => {},
    logout: () => {},
    getRebloggedList: () => {},
    getRate: () => {},
    getRewardFund: () => {},
    getTrendingTopics: () => {},
    getCurrentMedianHistoryPrice: () => {},
  };

  state = {
    loadedRepos: false,
    loadingRepos: false,
  };

  componentWillMount() {
    if (Cookie.get('session')) {
      this.props.login();
    }
    this.props.getRewardFund();
    this.props.getRebloggedList();
    this.props.getRate();
    this.props.getTrendingTopics();
    this.props.getCurrentMedianHistoryPrice();
  }

  componentDidUpdate () {
    const { user, getUser, getReposByGithub } = this.props;

    if (user && user.name && !this.state.loadedRepos && !this.state.loadingRepos) {
      this.setState({loadingRepos: true});
      getUser(user.name).then(res => {
        if (res.response && res.response.github) {
          this.setState({loadedRepos: true, loadingRepos: false});
          getReposByGithub(user.name, true);
        }else{
          this.setState({loadedRepos: true, loadingRepos: false});
        }
      });
    }
  }

  handleMenuItemClick = (key) => {
    switch (key) {
      case 'logout':
        this.props.logout();
        break;
      case 'new-contribution':
        this.props.history.push('/write');
        break;
      case 'review':
        this.props.history.push('/all/review');
        break;
      case 'new-blog-post':
        this.props.history.push('/write');
        break;
      case 'activity':
        window.open(`https://steemd.com/@${this.props.user.name}`);
        break;
      case 'replies':
        window.open(`https://steemit.com/@${this.props.user.name}/recent-replies`);
        break;
      case 'bookmarks':
        this.props.history.push('/bookmarks');
        break;
      case 'drafts':
        this.props.history.push('/drafts');
        break;
      case 'settings':
        this.props.history.push('/settings');
        break;
      default:
        break;
    }
  };

  render() {
    const { locale: appLocale, user, location } = this.props;
    const locale = getAvailableLocale(appLocale);
    const translations = getTranslations(appLocale);

    return (
      <IntlProvider key={locale} locale={locale} messages={translations}>
        <Layout>
          <Layout.Header style={{ position: 'fixed', width: '100%', zIndex: 5 }}>
            <Topnav username={user.name} onMenuItemClick={this.handleMenuItemClick} history={this.props.history} location={location} />
          </Layout.Header>
          <div className="content">
            {this.state.loadedRepos ? this.props.children : <Loading />}
            <Transfer />
          </div>
        </Layout>
      </IntlProvider>
    );
  }
}
