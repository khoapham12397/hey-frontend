import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import CustomAvatar from "./custom-avatar";
import { changeStateTransferPopup, changeTransfer, changeStateLuckyMoneyPopup } from "../actions/walletAction";
class ChatHeader extends React.Component {
  handleTransferClick = () => {
    // console.log(this.props.header.userId)
    // this.props.changeTransfer({
    //   name: this.props.header.title,
    //   avatar: this.props.header.avatar,
    //   userId: this.props.header.userId,
    // })
    if(this.props.wallet);
      this.props.changeStateTransferPopup(true);
  };

  handleLuckyMoney = () => {
    this.props.changeStateLuckyMoneyPopup(true);
  }

  render() {
    return (
      <div className="chat-header">
        <div style={{ width: 50 }}>
          {this.props.header.groupchat ? (
            <CustomAvatar type="panel-group-avatar" />
          ) : (
            <div>
              <CustomAvatar
                type="panel-avatar"
                avatar={this.props.header.avatar}
              />
            </div>
          )}
        </div>
        <div style={{ overflow: "hidden", paddingTop: 5 }}>
          <div className="panel-message">{this.props.header.title}</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          {this.props.header.groupchat ? (
            <Button type="danger" shape="round" icon="container" size="large" onClick={this.handleLuckyMoney}>
              Lucky money
            </Button>
          ) : (
            <Button
              type="primary"
              shape="round"
              icon="transaction"
              size="large"
              onClick={this.handleTransferClick}
            >
              Transfer
            </Button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.chatReducer.messageHeader,
    request: state.walletReducer.request,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStateTransferPopup(state) {
      dispatch(changeStateTransferPopup(state));
    },
    changeTransfer(transfer){
      dispatch(changeTransfer(transfer));
    },
    changeStateLuckyMoneyPopup(state) {
      dispatch(changeStateLuckyMoneyPopup(state));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
