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
    total: 0,
    skip: 0,
    limit: 10,
  };

  constructor(props) {
    super(props);
    this.loadContributions = this.loadContributions.bind(this);
  }


  loadContributions () {
    const { match, getContributions } = this.props;

    if (match.params.projectId) {
      getContributions({
        limit: this.state.limit,
        skip: this.state.skip,
        filterBy: 'project',
        sortBy: 'created',
        platform: match.params.platform,
        projectId: match.params.projectId,
      }).then(res => {
        this.setState({total: res.response.total, skip: this.state.skip + this.state.limit});
      });
    } else if (match.path === '/@:name') {
      getContributions({
        limit: this.state.limit,
        skip: this.state.skip,
        filterBy: 'author',
        sortBy: 'created',
        author: match.params.name,
      }).then(res => {
        this.setState({total: res.response.total, skip: this.state.skip + this.state.limit});
      });
    } else {
      getContributions({
        limit: this.state.limit,
        skip: this.state.skip,
        filterBy: 'all',
        sortBy: 'created',
      }).then(res => {
        this.setState({total: res.response.total, skip: this.state.skip + this.state.limit});
      });
    }
  }

  componentDidMount() {
    this.loadContributions();
  }

  render() {
    const { contributions, loading, user, authenticated } = this.props;
    let isFetching = loading === Actions.GET_CONTRIBUTIONS_REQUEST;
    const hasMore = this.state.total > contributions.length;

    return (
      <div>
        <ScrollToTop />

        <div className="AddContribution">
          <div>
            <img src="/img/utopian-logo-120x120.png" />
          </div>
          <div>
            <h3>Utopian Rewards Open Source Contributors!</h3>
            <p>
              <Link to={`/write`}>Create a <b>Contributor Report</b></Link> to share the latest contributions you made to an Open Source project.
              The Utopian community will vote and get you rewarded $$. <Link to={`/help/#contributor-report`}>Learn more</Link>
            </p>
          </div>
        </div>

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
