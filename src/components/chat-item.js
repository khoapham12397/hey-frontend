import React from 'react';
import CustomAvatar from "./custom-avatar";
import {Popover} from "antd";
import {SlideDown} from "react-slidedown";
import {api} from '../api/api';
class ChatItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.receivePresent = this.receivePresent.bind(this);
  };

  handleItemClick(e) {
    let newState = this.state.showDate;

    if (newState) {
      newState = false
    } else {
      newState = true;
    }
    this.setState({
      showDate: newState
    })
  }

  receivePresent(present){
    var arr = present.split(':');
    var del = Date.now() - parseInt(arr[5]);
    
    if(del > 86400000) {
      alert("This present id expired");
      return;
    }
  
    var payload = {presentId : arr[1], sessionId: arr[2]};
    var url = 'http://localhost:8081/api/wallet/protected/receivePresent';
    api.post(url, JSON.stringify(payload))
    .then(res=>{
      alert(JSON.stringify(res));
    });
    
  }
  
  render() {
    console.log(this.props.avatar)
    var cssClass;  var cssContentClass;
    var type= this.props.type;
    // = this.props.type == 1 ? 'chat-item-owner' : 'chat-item-other';
    if(type==1) {cssClass = 'chat-item-owner'; cssContentClass = 'chat-item-content-owner';}
    if(type==2) {cssClass = 'chat-item-other'; cssContentClass = 'chat-item-content-other';}
    if(type==3) {cssClass = 'chat-item-system'; cssContentClass = 'chat-item-content-system';}
    // = this.props.type == 1 ? 'chat-item-content-owner' : 'chat-item-content-other';
    var result =(<div></div>);//
    if(type==1 || type==2){
      result = ( <div onClick={this.handleItemClick} className={'chat-item chat-item-outer ' + cssClass}>
        <div className={'chat-item ' + cssClass}>
          <CustomAvatar type="chat-avatar" avatar={this.props.avatar} show={this.props.showavatar}/>
          <div className={'chat-item-content ' + cssContentClass}>{this.props.value}</div>
        </div>
        {this.state.showDate ?
          <SlideDown>
          <div className={'chat-item-date'}>{this.props.date}</div>
          </SlideDown>
          : ''}
      </div>);//
    }
    if(type==3){

      result = ( <div onClick={e=> this.receivePresent(this.props.value)} className={'chat-item chat-item-outer ' + cssClass}>
        <div className={'chat-item ' + cssClass}>
          <CustomAvatar type="chat-avatar" avatar={this.props.avatar} show={this.props.showavatar}/>
          <div className={'chat-item-content ' + cssContentClass}>{this.props.value}</div>
        </div>
        {this.state.showDate ?
          <SlideDown>
          <div className={'chat-item-date'}>{this.props.date}</div>
          </SlideDown>
          : ''}
      </div>);      
    }
    return result;
  }
};

export default ChatItem;