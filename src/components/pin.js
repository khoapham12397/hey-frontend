import React from "react";
import { Modal, message } from "antd";
import PinInput from "react-pin-input";
import { connect } from "react-redux";
import {
  transferWallet,
  changeStatePinPopup,
  topUpWallet,
  sendLuckyMoney,
} from "../actions/walletAction";
import "font-awesome/css/font-awesome.min.css";

const md5 = require("md5");

class Pin extends React.Component {
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
    this.props.changeStatePinPopup(true);
  };

  onChange = (value, index) => {
    this.setState({ pin: value });
  };

  handleOk = (e) => {
    if (this.state.pin.toString().length !== 6) {
      message.error("Please input 6 digit PIN");
      this.pin.focus();
      return;
    }
    const request = {
        ...this.props.request,
        "pin": md5(this.state.pin)
    }
    const type = request.type
    delete request.type;
    switch (type){
        case "topUp":
            this.props.topUpWallet(request);
            break;
        case "transfer":
          this.props.transferWallet(request);
          break;
        case "sendLuckyMoney":
          this.props.sendLuckyMoney(request);
          break;
        default:
            break;
    }
    console.log(request)
    this.pin.clear();
    this.props.changeStatePinPopup(false);
  };

  handleCancel = (e) => {
    this.props.changeStatePinPopup(false);
  };

  render() {
    return (
      <div>
        <Modal
          width="420px"
          title="Register wallet"
          visible={this.props.pinPopup}
          onOk={this.handleOk}
          okText="Ok"
          onCancel={this.handleCancel}
          cancelText="Cancel"
        >
          <PinInput
            focus
            length={6}
            secret
            type="numeric"
            ref={(p) => (this.pin = p)}
            onChange={this.onChange}
            onComplete={this.handleOk}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatePinPopup(state) {
        dispatch(changeStatePinPopup(state));
    },
    topUpWallet(topUp) {
        dispatch(topUpWallet(topUp));
    },
    transferWallet(transfer){
      dispatch(transferWallet(transfer));
    },
    sendLuckyMoney(luckyMoney){
      dispatch(sendLuckyMoney(luckyMoney));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pin);