import React from "react";
import { Modal, message, Input, Avatar } from "antd";
import { connect } from "react-redux";
import {
  changeStatePinPopup,
  changeStateTransferPopup,
  changeRequest,
} from "../actions/walletAction";
import $ from "jquery";
import "font-awesome/css/font-awesome.min.css";

class TransferPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    this.props.changeStateTransferPopup(true);
  };

  handleCancel = () => {
    this.props.changeStateTransferPopup(false);
  };

  handleOk = (e) => {
    console.log(this.props.transfer )
    if ($("#amount_transfer").val().length === 0) {
      message.error("Please input amount money");
      $("#amount_transfer").focus();
      return;
    }
    const amount = parseInt($("#amount_transfer").val());
    if (amount < 1000) {
      message.error("Minimum amount money is 1.000đ");
      $("#amount_transfer").focus();
      return;
    }
    if (amount > 20000000) {
      message.error("Maximum amount money is 20.000.000đ");
      $("#amount_transfer").focus();
      return;
    }
    if (amount > this.props.balance) {
      message.error("The amount transferred is greater than the balance");
      $("#amount_transfer").focus();
      return;
    }
    var transfer = {
      type: "transfer",
      amount,
      message: $("#message").val(),
      userId: this.props.transfer.userId,
    };
    console.log(transfer);
    this.props.changeRequest(transfer);
    $("#amount_transfer").val(0);
    this.props.changeStateTransferPopup(false);
    this.props.changeStatePinPopup(true);
  };

  handleCancel = (e) => {
    this.props.changeStateTransferPopup(false);
  };

  render() {
    return (
      <div>
        <Modal
          width="420px"
          title="Transfer"
          visible={this.props.transferPopup}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Transfer"
          cancelText="Cancel"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                color: "#ffffff",
                verticalAlign: "middle",
                backgroundColor: "#87d068",
              }}
              size="large"
            >
              {this.props.transfer.avatar}
            </Avatar>
            <div style={{ overflow: "hidden", paddingTop: 5 }}>
              <div className="user-name">{this.props.transfer.name}</div>
            </div>
          </div>
          <p className="model-label"> Please enter amount money (VNĐ): </p>
          <Input
            type="number"
            id="amount_transfer"
            min="10000"
            max="20000000"
            onPressEnter={this.handleOk}
            focus="true"
          />
          <p className="model-label"> Message (maximum 280 characters): </p>
          <Input
            type="text"
            id="message"
            maxLength="280"
            onPressEnter={this.handleOk}
            focus="true"
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pinPopup: state.walletReducer.pinPopup,
    request: state.walletReducer.request,
    transferPopup: state.walletReducer.transferPopup,
    transfer: state.walletReducer.transfer,
    balance: state.walletReducer.balance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatePinPopup(state) {
      dispatch(changeStatePinPopup(state));
    },
    changeStateTransferPopup(state){
        dispatch(changeStateTransferPopup(state));
    },
    changeRequest(request){
        dispatch(changeRequest(request));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferPopup);
