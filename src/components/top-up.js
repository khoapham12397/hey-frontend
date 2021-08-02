import React from "react";
import { Modal, Input, message } from "antd";
import CustomAvatar from "./custom-avatar";
import PinInput from "react-pin-input";
import { connect } from "react-redux";
import $ from "jquery";
import {
  topUpWallet,
  changeStateTopUpWalletPopup,
} from "../actions/walletAction";
import "font-awesome/css/font-awesome.min.css";

const md5 = require("md5");

class TopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pin: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal = () => {
    this.props.changeStateTopUpWalletPopup(true);
  };

  onChange = (value, index) => {
    this.setState({ pin: value });
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
    if (this.state.pin.toString().length !== 6) {
      message.error("Please input 6 digit PIN");
      this.pin.focus();
      return;
    }
    var topUp = {
      pin: md5(this.state.pin),
      amount: parseInt($("#amount").val()),
    };
    $("#amount").val(0);
    this.pin.clear();
    this.props.topUpWallet(topUp);
    this.props.changeStateTopUpWalletPopup(false);
  };

  handleCancel = (e) => {
    this.props.changeStateTopUpWalletPopup(false);
  };

  render() {
    return (
      <div>
        <div className="new-action-menu" onClick={this.showModal}>
          <a href="#">
            <i className="fa fa-credit-card" aria-hidden="true">
              {" "}
              <strong>Top Up</strong>
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
          <p className="model-label"> Please enter PIN: </p>
          <PinInput
            length={6}
            secret
            type="numeric"
            ref={(p) => (this.pin = p)}
            onChange={this.onChange}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    topUpPopup: state.walletReducer.topUpPopup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    topUpWallet(topUp) {
      dispatch(topUpWallet(topUp));
    },
    changeStateTopUpWalletPopup(state) {
      dispatch(changeStateTopUpWalletPopup(state));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);
