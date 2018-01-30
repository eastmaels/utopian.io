import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl} from 'react-intl';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import StoryPreview from './StoryPreview';
import Avatar from '../Avatar';
import BodyShort from './BodyShort';
import './Project.less';

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
      <div className="Project">
        <div className="Project__content">
          <div className="Project__header">
            <div className="Project__header__text">
              <Link to={`/project/${repo.owner.login}/${repo.name}/github/${repo.id}/all`}>
                <h4>
                  <span><Icon type="github"/> {repo.owner.login}</span>
                </h4>
              </Link>
            </div>
          </div>
          <div className="Project__content">
            <Link to={`/project/${repo.owner.login}/${repo.name}/github/${repo.id}/all`} className="Project__content__title">
              <h2>
                {repo.full_name}
              </h2>
            </Link>
            <Link to={`/project/${repo.owner.login}/${repo.name}/github/${repo.id}/all`} className="Project__content__preview">
              {repo.description && <span>
                <b>Description: </b> <div className="nomobile">
                  <BodyShort key="text" className="Project__content__body" body={repo.description || ''} />
                </div></span>}
              {repo.homepage && <span>
              <b>Website: </b> <code className="Github__c">{repo.homepage}</code>
              <br/></span>}
              {repo.language && <span>
                <b>Primary Language: </b> <code className="Github__c">{repo.language}</code></span>}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;


