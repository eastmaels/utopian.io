import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../actions/constants';
import { Link } from 'react-router-dom';
import Feed from './Feed';
import EmptyFeed from '../statics/EmptyFeed';
import ScrollToTop from '../components/Utils/ScrollToTop';

import { getIsAuthenticated, getAuthenticatedUser } from '../reducers';

// @UTOPIAN
import { getContributions } from '../actions/contributions';
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;

@connect(
  state => ({
    authenticated: getIsAuthenticated(state),
    user: getAuthenticatedUser(state),
    contributions: state.contributions,
    loading: state.loading,
  }),
  {
    getContributions,
  },
)
class SubFeed extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired
  };

  state = {
    skip: 0,
  };

  constructor(props) {
    super(props);
    this.loadContributions = this.loadContributions.bind(this);
    this.total = 0;
  }

  loadContributions (nextProps = false) {
    const { match, getContributions } = nextProps || this.props;
    const skip =  nextProps ? 0 : this.state.skip;
    const limit = 20;
    this.total = nextProps ? 0 : this.total;

    if (match.params.projectId) {
      getContributions({
        limit,
        skip,
        section: 'project',
        sortBy: 'created',
        platform: match.params.platform,
        projectId: match.params.projectId,
        type: match.params.type || 'all'
      }).then(res => {
        this.total = res.response.total;
        this.setState({skip: skip + limit});
      });
    } else if (match.path === '/@:name') {
      getContributions({
        limit,
        skip,
        section: 'author',
        sortBy: 'created',
        author: match.params.name,
      }).then(res => {
        this.total = res.response.total;
        this.setState({skip: skip + limit});
      });
    } else {
      getContributions({
        limit,
        skip,
        section: 'all',
        sortBy: 'created',
        filterBy: match.params.filterBy || 'any',
        type: match.params.type || 'all'
      }).then(res => {
        this.total = res.response.total;
        this.setState({skip: skip + limit});
      });
    }
  }

  renderContributions () {
    const { contributions, match } = this.props;

    const filteredContributions = contributions.filter(contribution => {
      if (match.params.projectId) {
        if (match.params.type === 'all') {
          return contribution.json_metadata.repository.id === parseInt(match.params.projectId) && contribution.reviewed === true;
        } else {
          return contribution.json_metadata.repository.id === parseInt(match.params.projectId) &&
            contribution.reviewed === true &&
            contribution.json_metadata.type === match.params.type;
        }
      } else if (match.path === '/@:name') {
        return contribution.author === match.params.name && contribution.reviewed === true;
      } else if (match.params.filterBy && match.params.filterBy === 'review') {
        return contribution.reviewed === false;
      } else if (match.params.type && match.params.type !== 'all') {
        return contribution.json_metadata.type === match.params.type && contribution.reviewed === true;
      }
      return contribution.reviewed === true;
    });

    return filteredContributions;
  }


  componentWillReceiveProps (nextProps) {
    const { location } = this.props;

    if (location.pathname !== nextProps.location.pathname) {
      this.total = 0; // @TODO @UTOPIAN antipattern - requires better implementation
      this.loadContributions(nextProps);
    }
  }

  componentDidMount() {
    this.loadContributions();
  }

  render() {
    const { loading, history, match, location } = this.props;
    const contributions = this.renderContributions();
    const isFetching = loading === Actions.GET_CONTRIBUTIONS_REQUEST;
    const hasMore = this.total > contributions.length;

    return (
      <div>
        <ScrollToTop />

        {match.path !== "/@:name" && match.params.filterBy !== "review" &&
        <Tabs defaultActiveKey={match.params.type || 'all'} onTabClick={type => history.push(`${type}`)}>
          <TabPane tab={<span><Icon type="appstore-o" />All</span>} key="all" />
          <TabPane tab={<span><Icon type="bulb" />Ideas</span>} key="ideas" />
          <TabPane tab={<span><Icon type="code" />Code</span>} key="code" />
          <TabPane tab={<span><Icon type="layout" />Graphics</span>} key="graphics" />
          <TabPane tab={<span><Icon type="share-alt" />Social</span>} key="social" />
        </Tabs>}

        <Feed
          content={ contributions }
          isFetching={ isFetching }
          hasMore={ hasMore }
          loadMoreContent={ this.loadContributions }
        />
        {!contributions.length && !isFetching && <EmptyFeed />}
      </div>
    );
  }
}

export default SubFeed;
