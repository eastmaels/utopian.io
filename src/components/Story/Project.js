import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl} from 'react-intl';
import { Link } from 'react-router-dom';
import StoryPreview from './StoryPreview';
import Avatar from '../Avatar';
import './Story.less';

@injectIntl
class Project extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    repo: PropTypes.shape().isRequired,
  };

  static defaultProps = {
  };

  render() {
    const {
      repo,
    } = this.props;

    return (
      <div className="Story">
        <div className="Story__content">
          <div className="Story__header">
            <div className="Story__header__text">
              <Link to={`/project/${repo.owner.login}/${repo.name}/github/${repo.id}/all`}>
                <h4>
                <Avatar username={repo.owner.avatar_url} size={30} /> {repo.owner.login}
                </h4>
              </Link>
            </div>
          </div>
          <div className="Story__content">
            <Link to={`/project/${repo.owner.login}/${repo.name}/github/${repo.id}/all`} className="Story__content__title">
              <h2>
                {repo.full_name}
              </h2>
            </Link>
            <Link to={`/project/${repo.owner.login}/${repo.name}/github/${repo.id}/all`} className="Story__content__preview">
              <StoryPreview text={repo.description || ''} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;


