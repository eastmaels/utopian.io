import React from 'react';
import { PropTypes } from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { Tabs, Modal } from 'antd';
import ScoresList from './ScoresList';

class ScoreModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    voters: PropTypes.array,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    voters: [],
    onOpen: () => {},
    onClose: () => {},
  };

  state = {
    visible: false,
  };

  render() {
    const { voters } = this.props;

    const tabs = [];

    if (voters.length > 0) {
      tabs.push(<Tabs.TabPane
        tab={
          <span>
            <i className="iconfont icon-praise_fill" />
            <span className="StoryFooter__icon-text">
              <FormattedNumber value={voters.length} />
            </span>
          </span>
        }
        key="1"
      >
        <ScoresList voters={voters} />
      </Tabs.TabPane>);
    }

    console.log("VOTERS", voters)

    return (
      <Modal
        visible={this.props.visible && (voters.length > 0)}
        footer={null}
        onCancel={this.props.onClose}
      >
        <Tabs>
          {tabs}
        </Tabs>
      </Modal>
    );
  }
}

export default ScoreModal;
