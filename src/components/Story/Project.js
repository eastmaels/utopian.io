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
    project: PropTypes.shape().isRequired,
  };

  static defaultProps = {
  };

  render() {
    const {
      project,
    } = this.props;

    return (
      <div className="Story">
        <div className="Story__content">
          <div className="Story__header">
            <a target="_blank" href={`https://github.com/${project.owner.login}`}>
              <Avatar username={project.owner.avatar_url} size={30} />
            </a>
            <div className="Story__header__text">
              <Link to={`/project/${project.owner.login}/${project.name}/github/${project.id}/all`}>
                <h4>
                  {project.owner.login}
                </h4>
              </Link>
            </div>
          </div>
          <div className="Story__content">
            <Link to={`/project/${project.owner.login}/${project.name}/github/${project.id}/all`} className="Story__content__title">
              <h2>
                {project.full_name}
              </h2>
            </Link>
            <Link to={`/project/${project.owner.login}/${project.name}/github/${project.id}/all`} className="Story__content__preview">
              <StoryPreview text={project.description || ''} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;


