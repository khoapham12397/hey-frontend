import React from "react";
import { Modal, Input, message } from "antd";
import { connect } from "react-redux";
import $ from "jquery";
import {
  changeStateTopUpWalletPopup,
  changeStatePinPopup,
} from "../actions/walletAction";
import "font-awesome/css/font-awesome.min.css";
import Pin from './pin'

class TopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pin: 0,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal = () => {
    this.props.changeStateTopUpWalletPopup(true);
  };

  handleOk = (e) => {
    if ($("#amount").val().length === 0) {
      message.error("Please input amount money");
      $("#amount").focus();
      return;
    }
    if ($("#amount").val() < 10000) {
      message.error("Minimum amount money is 10.000đ");
      $("#amount").focus();
      return;
    }
    if ($("#amount").val() > 2000000) {
      message.error("Maximum amount money is 20.000.000đ");
      $("#amount").focus();
      return;
    }
    var topUp = {
      amount: parseInt($("#amount").val()),
    };
    this.setState({"request": topUp})
    $("#amount").val(0);
    this.props.changeStateTopUpWalletPopup(false);
    console.log(this.props.pinPopup)
    this.props.changeStatePinPopup(true);
    console.log(this.props.pinPopup)
  };

  handleCancel = (e) => {
    this.props.changeStateTopUpWalletPopup(false);
  };

  render() {
    return (
      <div>
        <div className="new-action-menu" onClick={this.showModal}>
          <a href="#" style={{padding:10}}>
            <i className="fa fa-credit-card" aria-hidden="true">
              <strong> Top Up</strong>
            </i>
            {/* <div className="new-text">Top Up</div> */}
          </a>
        </div>
        <Modal
          width="420px"
          title="Register wallet"
          visible={this.props.topUpPopup}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Top Up"
          cancelText="Cancel"
        >
          <p className="model-label"> Please enter amount money (VNĐ): </p>
          <Input
            type="number"
            id="amount"
            min="10000"
            max="20000000"
            onPressEnter={this.handleOk}
            focus="true"
          />
        </Modal>
        <Pin request={this.state.request} type={"topup"}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topUpPopup: state.walletReducer.topUpPopup,
    pinPopup: state.walletReducer.pinPopup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStateTopUpWalletPopup(state) {
      dispatch(changeStateTopUpWalletPopup(state));
    },
    changeStatePinPopup(state) {
      dispatch(changeStatePinPopup(state));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);
