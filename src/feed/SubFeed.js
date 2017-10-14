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
        type: 'project',
        sortBy: 'created',
        platform: match.params.platform,
        projectId: match.params.projectId,
      }).then(res => {
        this.total = res.response.total;
        this.setState({skip: skip + limit});
      });
    } else if (match.path === '/@:name') {
      getContributions({
        limit,
        skip,
        type: 'author',
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
        type: 'all',
        sortBy: 'created',
        filterBy: match.params.filterBy || 'any',
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
        return contribution.json_metadata.repository.id === parseInt(match.params.projectId) && contribution.reviewed === true;
      } else if (match.path === '/@:name') {
        return contribution.author === match.params.name && contribution.reviewed === true;
      } else if (match.params.filterBy && match.params.filterBy === 'review') {
        return contribution.reviewed === false;
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
    const { loading } = this.props;
    const contributions = this.renderContributions();
    const isFetching = loading === Actions.GET_CONTRIBUTIONS_REQUEST;
    const hasMore = this.total > contributions.length;

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
