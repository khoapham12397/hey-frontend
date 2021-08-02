import React from 'react';
import {connect} from "react-redux";
import ChatItem from "./chat-item";


class MessagePanel extends React.Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavior: "smooth"});
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
//    var keys = Object.keys(this.props);    

    return (
      <div className='chat-content'>
        <div
          ref={(el) => {this.messagesEnd = el}}>
        </div>
        {this.props.messageItems.map((item, index) =>
          <ChatItem key={index} type={item.type} value={item.message} showavatar={item.showavatar}
                    avatar={item.avatar} date={item.createdDate}
                        
                    />
        )}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messageItems: state.chatReducer.messageItems
  }
}
// vi du the nay ne: dau tien neu ma add chung chac duoc ma :
// dung vay chi can modify ??? them 1 than bao no lai la duco :
// dieu nay duoc :

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePanel);