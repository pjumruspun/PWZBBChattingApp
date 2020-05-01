import React from "react";
import "./ChatBox.css";
import Message from "./Message";
import MyMessage from "./MyMessage";
import ScrollArea from "react-scrollbar";
import { Scrollbars } from 'react-custom-scrollbars';
import TextInput from './TextInput';
import Axios from 'axios';

class ChatBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        groupName: ''
      };
    }

    sendMessage(text) {
        
    }

    componentDidUpdate() {
      Axios
      .get(`http://localhost:8080/groups/${this.props.groupID}`)
      .then((response) => {
        this.setState({groupName: response.data.name});
      })
      .catch((error) => {
        console.log(error);
      });
    }

    render() {
      return (
        <div className='chatbox-container'>
        
          <Scrollbars className='scrollbar-chat'>
          <div className="groupname-container">
            <h1 className="groupName">{this.state.groupName}</h1>
          </div>
          <br/>
          {this.props.messages.map((message, index) => {
            if(message.senderId === this.props.id){
              return (
                <MyMessage key={index} username={message.senderId} text={message.text}/>
              )} else {
                return (
                  <Message key={index} username={message.senderId} text={message.text}/>
                )
              }
          })}
          </Scrollbars>

          <TextInput sendMessage={this.sendMessage} id={this.props.id} group={this.props.groupID}/>
        </div>
      )
    }

    // render() {
    //     return (
    //         <div className='chatbox-container'>
    //         <Scrollbars className='scrollbar-chat'>
    //         <div className="chatbox">
    //         <h1>Gu is Chatbox</h1>
    //         <Message message="hello"/>
    //         <MyMessage message="What's up Boom"/>
    //         <Message message="ไอปาค กูต้องการความช่วยเหลือgfsdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdsadsadsasda"/>
    //         <MyMessage message="มึงพูดเหี้ยไรเนี่ย"/>
    //         <MyMessage message="เมาป่าว"/>
    //         <Message message="ไม่เมา อยากเมาปะ"/>
    //         <Message message="ข้าวสาร"/>
    //         <MyMessage message="จัด"/>
    //         <Message message="hello"/>
    //         <MyMessage message="What's up Boom"/>
    //         <Message message="ไอปาค กูต้องการความช่วยเหลือgfsdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkasdsadsadsasda"/>
    //         <MyMessage message="มึงพูดเหี้ยไรเนี่ย"/>
    //         <MyMessage message="เมาป่าว"/>
    //         <Message message="ไม่เมา อยากเมาปะ"/>
    //         <Message message="ข้าวสาร"/>
    //         <MyMessage message="จัด"/>
    //         </div>
    //         </Scrollbars>
    //         <TextInput />
    //         </div>
    //     );
    // }

}

export default ChatBox;