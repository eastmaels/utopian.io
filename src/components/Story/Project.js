import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl} from 'react-intl';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
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

    console.log(repo);

    return (
      <div className="Story">
        <div className="Story__content">
          <div className="Story__header">
            <div className="Story__header__text">
              <Link to={`/project/${repo.owner.login}/${repo.name}/github/${repo.id}/all`}>
                <h4>
                <span><Icon type="github"/> {repo.owner.login}</span>
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
              {repo.description && <span><b className="Github__t">Description: </b> <StoryPreview text={repo.description || ''} /></span>}
              {repo.homepage &&<span>
              <b className="Github__t">Website: </b> <code className="Github__c">{repo.homepage}</code>
              <br/></span>}
              {repo.language && <span><b className="Github__t">Primary Language: </b> <code className="Github__c">{repo.language}</code></span>}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;


