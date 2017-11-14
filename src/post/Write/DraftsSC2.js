import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loading from '../../components/Icon/Loading';
import { reload } from '../../auth/authActions';
import { getDraftPostsSC2, getPendingDraftsSC2, getIsReloading } from '../../reducers';
import Affix from '../../components/Utils/Affix';
import LeftSidebar from '../../app/Sidebar/LeftSidebar';
import DraftRowSC2 from './DraftRowSC2';

@connect(
  state => ({
    reloading: getIsReloading(state),
    draftPostsSC2: getDraftPostsSC2(state),
    pendingDraftsSC2: getPendingDraftsSC2(state),
  }),
  { reload },
)
class DraftsSC2 extends React.Component {
  static propTypes = {
    reloading: PropTypes.bool,
    draftPostsSC2: PropTypes.shape().isRequired,
    pendingDraftsSC2: PropTypes.arrayOf(PropTypes.string),
    reload: PropTypes.func,
  };

  static defaultProps = {
    reloading: false,
    pendingDraftsSC2: [],
    reload: () => {},
  };

  componentDidMount() {
    this.props.reload();
  }

  render() {
    const { reloading, draftPostsSC2, pendingDraftsSC2 } = this.props;

    const noDrafts = !reloading && _.size(draftPostsSC2) === 0;

    return (
      <div className="shifted">
        <div className="settings-layout container">
          <Affix className="leftContainer" stickPosition={77}>
            <div className="left">
              <LeftSidebar />
            </div>
          </Affix>
          <div className="center">
            <h1>
              <FormattedMessage id="drafts" defaultMessage="Drafts" />
            </h1>
            {reloading && <Loading center={false} />}
            {noDrafts && (
              <h3 className="text-center">
                <FormattedMessage
                  id="drafts_empty"
                  defaultMessage="You don't have any draft saved"
                />
              </h3>
            )}
            {!reloading &&
              _.map(draftPostsSC2, (draft, key) => (
                <DraftRowSC2 key={key} data={draft} id={key} pending={pendingDraftsSC2.includes(key)} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DraftsSC2;
