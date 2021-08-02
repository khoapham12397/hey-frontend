import React from "react";
import { Modal, Input, message } from "antd";
import CustomAvatar from "../components/custom-avatar";
import PinInput from "react-pin-input";
import { connect } from "react-redux";
import $ from "jquery";
import {
  registerWallet,
  changeStateRegisterWalletPopup,
} from "../actions/walletAction";
var bcrypt = require('bcryptjs');

class RegisterWallet extends React.Component {
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
    this.props.changeStateRegisterWalletPopup(true);
  };

  onChange = (value, index) => {
    this.setState({ pin: value });
  };

  handleOk = (e) => {
	if ($("#phone").val().length === 0){
		message.error('Please input the phone');
		$("#phone").focus();
		return
	}
    if (this.state.pin.toString().length !== 6) {
		message.error('Please input 6 digit PIN');
		this.pin.focus();
		return
    }
	var wallet = {
		"phone" : $("#phone").val(),
		"hashedPin": bcrypt.hashSync(this.state.pin, 10)
	};
	$("#phone").val("");
	this.pin.clear();
	this.props.registerWallet(wallet)
	this.props.changeStateRegisterWalletPopup(false);
  };

  handleCancel = (e) => {
    this.props.changeStateRegisterWalletPopup(false);
  };

  render() {
    return (
      <div>
        <div className="new-action-menu" onClick={this.showModal}>
          <a href="#">
            <CustomAvatar type="new-avatar" />
            <div className="new-text">Register wallet</div>
          </a>
        </div>
        <Modal
          width="420px"
          title="Register wallet"
          visible={this.props.registerWalletPopup}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Register"
          cancelText="Cancel"
        >
          <p className="model-label"> Please enter phone:</p>
          <Input id="phone" className="phone" onPressEnter={this.handleOk} focus/>
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
    registerWalletPopup: state.walletReducer.registerWalletPopup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerWallet(hashedPin) {
      dispatch(registerWallet(hashedPin));
    },
    changeStateRegisterWalletPopup(state) {
      dispatch(changeStateRegisterWalletPopup(state));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterWallet);
