import React from "react";
import { Modal, Input, message, Menu, Avatar } from "antd";
import { connect } from "react-redux";
import $ from "jquery";
import {
  changeRequest,
  changeStatePinPopup,
  changeStateTransferPopup,
} from "../actions/walletAction";
import "font-awesome/css/font-awesome.min.css";
import CustomAvatar from "../components/custom-avatar";
import {
  handleChangeAddressBook,
  loadAddressBookList,
} from "../actions/addressBookAction";
import { Scrollbars } from "react-custom-scrollbars";
import { changeMessageHeader } from "../actions/chatAction";

const { SubMenu } = Menu;

class TransferP2P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [],
    };
  }

  componentDidMount() {
    this.props.loadAddressBookList();
  }

  showModal = () => {
    this.props.changeStateTransferPopup(true);
  };

  handleCancel = () => {
    this.props.changeStateTransferPopup(false);
  };

  handleOk = (e) => {
    if ($("#amount_transfer").val().length === 0) {
      message.error("Please input amount money");
      $("#amount_transfer").focus();
      return;
    }
    const amount = parseInt($("#amount_transfer").val());
    console.log(amount)
    if (amount < 1000) {
      message.error("Minimum amount money is 1.000đ");
      $("#amount_transfer").focus();
      return;
    }
    if (amount > 2000000) {
      message.error("Maximum amount money is 20.000.000đ");
      $("#amount_transfer").focus();
      return;
    }
    if (amount > this.state.balance) {
      message.error("The amount transferred is greater than the balance");
      $("#amount_transfer").focus();
      return;
    }
    var transfer = {
      type: "transfer",
      amount,
      message: $("#message").val(),
      userId: this.state.userId,
    };
    this.props.changeRequest(transfer);
    $("#amount_transfer").val(0);
    this.props.changeStateTransferPopup(false);
    console.log(this.props.pinPopup);
    this.props.changeStatePinPopup(true);
    console.log(this.props.pinPopup);
  };

  handleCurrentChange = (event) => {
    this.setState({
      ...this.state,
      current: [event.key],
    });
    console.log(this.props.addressBookList[event.key]);
    if (!this.props.addressBookList[event.key].wallet) {
      this.props.changeMessageHeader(
        this.props.addressBookList[event.key].name,
        this.props.addressBookList[event.key].avatar,
        false
      );
      this.props.handleChangeAddressBook(
        this.props.addressBookList[event.key].userId
      );
      return;
    }
    this.setState({
      ...this.state,
      name: this.props.addressBookList[event.key].name,
      avatar: this.props.addressBookList[event.key].avatar,
      userId: this.props.addressBookList[event.key].userId,
      current: []
    });
    this.props.changeStateTransferPopup(true);
  };

  render() {
    return (
      <div className="d-flex flex-column address-book-menu">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={100}
          autoHeightMax={500}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[]}
            selectedKeys={this.state.current}
            onSelect={this.handleCurrentChange}
          >
            <SubMenu
              key="sub"
              title={
                <a href="#">
                  <i className="fa fa-exchange" aria-hidden="true">
                    <strong> Transfer</strong>
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
                    <div />
                  )}
                  <div style={{ overflow: "hidden", paddingTop: 5 }}>
                    <div className="user-name">{item.name}</div>
                  </div>
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </Scrollbars>
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
              {this.state.avatar}
            </Avatar>
            <div style={{ overflow: "hidden", paddingTop: 5 }}>
              <div className="user-name">{this.state.name}</div>
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
    addressBookList: state.addressBookReducer.addressBookList,
    pinPopup: state.walletReducer.pinPopup,
    transferPopup: state.walletReducer.transferPopup,
    balance: state.walletReducer.balance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStatePinPopup(state) {
      dispatch(changeStatePinPopup(state));
    },
    changeRequest(request) {
      dispatch(changeRequest(request));
    },
    changeStateTransferPopup(state) {
      dispatch(changeStateTransferPopup(state));
    },
    loadAddressBookList() {
      dispatch(loadAddressBookList());
    },
    changeMessageHeader(avatar, title, groupchat) {
      dispatch(changeMessageHeader(avatar, title, groupchat));
    },
    handleChangeAddressBook(userId) {
      dispatch(handleChangeAddressBook(userId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferP2P);
