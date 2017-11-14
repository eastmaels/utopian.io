import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteDraftSC2 } from './editorActions';

@connect(null, { deleteDraftSC2 })
class DraftRowSC2 extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.shape().isRequired,
    pending: PropTypes.bool,
    deleteDraftSC2: PropTypes.func,
  };

  static defaultProps = {
    pending: false,
    deleteDraftSC2: () => {},
  };

  handleDeleteClick = () => this.props.deleteDraftSC2(this.props.id);

  render() {
    const { id, data, pending } = this.props;
    let { title = '', body = '' } = data;
    title = title.trim();
    body = body.replace(/\r?\n|\r|[\u200B-\u200D\uFEFF]/g, ' ').substring(0, 50);
    let draftTitle = title.length ? title : body;
    draftTitle = draftTitle.trim();

    const type = data.jsonMetadata.type || '';
    const repository = data.jsonMetadata.repository || {};

    return (
      <div>
        <Link to={{ pathname: type.indexOf('task') > -1 ? `/write-task-sc2/${repository.id}` : '/write-sc2', search: `?draft=${id}` }}>
          <h3>
            {draftTitle.length === 0 ? <FormattedMessage id="draft_untitled" defaultMessage="Untitled draft" /> : draftTitle}
          </h3>
        </Link>
        <div>
          <Button loading={pending} type="danger" onClick={this.handleDeleteClick} disabled={true}>
            <FormattedMessage id="draft_delete" defaultMessage="Delete this draft" />
          </Button>
        </div>
      </div>
    );
  }
}

export default DraftRowSC2;
