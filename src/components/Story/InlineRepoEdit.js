import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import Autocomplete from 'react-autocomplete';
import { connect } from 'react-redux';
import getStore from '../../store';
import { getGithubRepos, setGithubRepos } from '../../actions/projects';

@connect(
  state => ({
    repos: state.repos,
  }),
  {
    getGithubRepos,
    setGithubRepos,
  },
)
class InlineRepoEdit extends React.Component {
  static propTypes = {
    post: PropTypes.shape().isRequired,
    user: PropTypes.shape().isRequired,
    moderatorAction: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    post: [],
    user: [],
    moderatorAction: () => {},
    value: '',
  };

  state = {
    value: this.props.value,
    previousValue: '',
    loading: false,
    loaded: true
  }

  constructor (props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
    this.post = props.post
  }

  renderItems(items) {
    return items;
  }

  setPreviousValue(event) {
    this.setState({
      previousValue: event.target.value,
    })
  }

  callModeratorAction() {
    const { post, user, moderatorAction } = this.props;
    const status = null, questions = [], score = 0, type = null;

    if (this.state.value !== this.state.previousValue) {
      const repoName = this.state.value;
      let q = repoName.replace('https://', '');
      if (repoName.indexOf('github') > -1) {
        q = q.replace('http://', '');
        q = q.replace('github.com/', '');
        q = '"' + q + '"';
      }
      // set query to search for specific repository only
      q = "repo:" + repoName;

      this.props.getGithubRepos({q}).then(resp => {
          this.setState({loaded: true, loading: false});
          this.props.moderatorAction(
            this.post.author,
            this.post.permlink,
            user.name,
            status,
            questions,
            score,
            type,
            this.state.repository,
          ).then((res) => {
            // do nothing; moderator action succeeded
            // console.log("repo changed", res);
          });
        }).catch(e => {
          // if inputted repository does not exist, reset to previous valid repo.
          this.setState({value: this.state.previousValue});
        });
  debounceTimer = null;
    }
  }

  render () {
    const { repos } = this.props;
    return (
      <Autocomplete
        ref={ search => this.search = search }
        value={ this.state.value }
        inputProps={{
            id: 'inline-edit',
            placeholder: 'Browse Github repositories',
            className: `inline-repo-edit`,
            onKeyPress: (event) => {
              let q = event.target.value;
              q = q.replace('https://', '');
              q = q.replace('http://', '');
              q = q.replace('github.com/', '');
              q = '"' + q + '"';
              
              if (event.key === 'Enter')
              {
                event.preventDefault();
              }
              
              this.setState({loading: true, loaded: false});
              
              clearTimeout(this.debounceTimer);
              this.debounceTimer = setTimeout(() => {
                this.debounceTimer = null;
                this.props.getGithubRepos({
                  q,
                }).then(() => {
                  this.setState({loading: false, loaded: true});
                });

              }, 2000);
            },
            onPaste: (event) => {
              const pasted = event.clipboardData.getData('Text');
              if (pasted.indexOf('github') > -1) {
                let q = pasted.replace('https://', '');
                q = q.replace('http://', '');
                q = q.replace('github.com/', '');
                q = '"' + q + '"';

                this.props.getGithubRepos({
                  q,
                }).then(() => {
                  this.setState({loaded: true, loading: false});
                });
              }
            },
            onFocus: (event) => this.setPreviousValue(event),
            onBlur: (event) => this.callModeratorAction(),
          }}
        items={ repos }
        onSelect={(value, repo) => {
          this.setState({
            value: repo.full_name,
            repository: repo,
          }, () => {
            this.callModeratorAction()
          });
          
        }}
        getItemValue={repo => repo.full_name}
        onChange={(event, value) => {
          this.setState({value});
          if (value === '') {
            this.setState({loaded: false});
          }
        }}
        renderItem={(repo, isHighlighted) => (
          <div
        style={{ padding: '5px', paddingRight: '10px'  }}
            className='Topnav__search-item'
            key={repo.full_name}>
            <span><Icon type='github' /> <b>{repo.full_name}</b></span>
            <span>{repo.html_url}</span>
          </div>
        )}
        renderMenu={(items, value) => (
            <div>
              {items.length === 0 && !this.state.loaded && !this.state.loading && <div className="Topnav__search-tip"><b>Press enter to see results</b></div>}
              {items.length === 0 && this.state.loaded && <div className="Topnav__search-tip">No projects found</div>}
              {this.state.loading && <div className="Topnav__search-tip">Loading...</div>}
              {items.length > 0 && items}
            </div>
          </div>
        )}
      />
    );
  }
}

export default InlineRepoEdit;