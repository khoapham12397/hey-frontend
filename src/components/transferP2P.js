import React from "react";
import { Modal, Input, message, Menu } from "antd";
import { connect } from "react-redux";
import $ from "jquery";
import { changeStatePinPopup } from "../actions/walletAction";
import "font-awesome/css/font-awesome.min.css";
import Pin from "./pin";
import CustomAvatar from "../components/custom-avatar";
import {
    loadAddressBookList
} from "../actions/addressBookAction"

const { SubMenu } = Menu;

class TransferP2P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pin: 0,
    };
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.props.loadAddressBookList();
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
    this.setState({ request: topUp });
    $("#amount").val(0);
    this.props.changeStateTopUpWalletPopup(false);
    console.log(this.props.pinPopup);
    this.props.changeStatePinPopup(true);
    console.log(this.props.pinPopup);
  };

  render() {
    return (
      <div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[]}
          selectedKeys={this.state.current}
          onSelect={this.han}
        >
          <SubMenu
            key="sub"
            title={
              <a href="#">
                <i class="fa fa-exchange" aria-hidden="true">
                  <strong>  Transfer</strong>
                </i>
              </a>
            }
          >
            {this.props.addressBookList.map((item, index) => (
              <Menu.Item key={index}>
                <div style={{ width: 60 }}>
                  <CustomAvatar type="user-avatar" avatar={item.avatar} />
                </div>
                {item.wallet ? (
                  <div className="status-point zalopay" />
                ) : (
                  <div/>
                )}
                <div style={{ overflow: "hidden", paddingTop: 5 }}>
                  <div className="user-name">{item.name}</div>
                </div>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addressBookList: state.addressBookReducer.addressBookList,
    pinPopup: state.walletReducer.pinPopup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatePinPopup(state) {
      dispatch(changeStatePinPopup(state));
    },
    loadAddressBookList() {
      dispatch(loadAddressBookList());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferP2P);
