import React from 'react';
import {Menu} from 'antd';
import CustomAvatar from '../components/custom-avatar';
import StartChatGroup from "./start-chat-group";
import {connect} from 'react-redux';
import {changeMessageHeader, loadChatContainer, loadChatList, userSelected} from "../actions/chatAction";
import { changeRequest, changeTransfer } from '../actions/walletAction';
import {
  loadAddressBookList,
} from "../actions/addressBookAction";
import {Scrollbars} from 'react-custom-scrollbars';
import {store} from "../index";

class ChatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuaction: 1
    }
  }

  updateInfo = (sessionId) =>{
    console.info(sessionId)
    for (var i = 0; i < this.props.chatList.length; i ++) {
      if (this.props.chatList[i].sessionId === sessionId) {
        let wallet = false;
        let userId = "";
        for (var j = 0; j < this.props.addressBookList.length; j++) {
          if (this.props.chatList[i].userId === this.props.addressBookList[j].userId){
            wallet = this.props.addressBookList[j].wallet;
            userId = this.props.addressBookList[j].userId;
          }
        }
        this.props.changeMessageHeader(this.props.chatList[i].name, this.props.chatList[i].avatar, this.props.chatList[i].groupchat, wallet);
        this.props.changeTransfer({
          name: this.props.chatList[i].name,
          avatar: this.props.chatList[i].avatar,
          userId,
        })
      }
    }
  }

  componentDidMount() {
    this.props.loadChatList();
    this.props.loadAddressBookList();
  }

  componentDidUpdate(){
    this.updateInfo(store.getState().chatReducer.currentSessionId);
  }

  handleChangeChatItem = (event) => {
    this.props.userSelected(event.key);
    this.props.loadChatContainer(event.key);
    this.updateInfo(event.key);
  }

  render() {

    if (this.props.chatList) {
      return (
        <div className="d-flex flex-column full-height">
          <StartChatGroup/>
          <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
            <Menu theme="light" mode="inline" className="chat-list"
                  onSelect={this.handleChangeChatItem} selectedKeys={this.props.userSelectedKeys}>
              {this.props.chatList.map((item, index) =>
                <Menu.Item key={item.sessionId}>
                  <div style={{width: 60}}>
                    {item.groupchat ?
                      <CustomAvatar type="group-avatar"/>
                      :
                      <CustomAvatar type="user-avatar" avatar={item.avatar}/>
                    }
                  </div>
                  {item.unread > 0 ?
                    <div className="unread-item" style={{overflow: 'hidden', paddingTop: 5}}>
                      <div className="user-name">{item.name}</div>
                      <div className="history-message">{item.lastMessage}</div>
                    </div>
                    :
                    <div style={{overflow: 'hidden', paddingTop: 5}}>
                      <div className="user-name">{item.name}</div>
                      <div className="history-message">{item.lastMessage}</div>
                    </div>
                  }
                  {item.unread > 0 ?
                    <div className="unread">{item.unread}</div>
                    : ''
                  }
                </Menu.Item>
              )}
            </Menu>
          </Scrollbars>
        </div>)
    } else {
      return (
        "Loading..."
      )
    }
  }
};


function mapStateToProps(state) {
  return {
    chatList: state.chatReducer.chatList,
    userSelectedKeys: state.chatReducer.userSelectedKeys,
    addressBookList: state.addressBookReducer.addressBookList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadChatList() {
      dispatch(loadChatList())
    },
    loadChatContainer(sessionId) {
      dispatch(loadChatContainer(sessionId))
    },
    changeMessageHeader(avatar, title, groupchat, wallet) {
      dispatch(changeMessageHeader(avatar, title, groupchat, wallet))
    },
    userSelected(sessionId) {
      dispatch(userSelected(sessionId))
    },
    changeRequest(request){
      dispatch(changeRequest(request))
    },
    changeTransfer(transfer){
      dispatch(changeTransfer(transfer));
    },
    loadAddressBookList() {
      dispatch(loadAddressBookList());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatList);
