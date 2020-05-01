import React from "react";
import "./Message.css";
import axios from 'axios';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      name: null,
    };
  }

  componentWillMount() {
    axios.get(`http://localhost:8080/clients/${this.props.username}`)
        .then(res => {
            this.setState({name: res.data.name})
        })
  }

  render() {
    return (
      <div className="flex-container">
        <div className="userName-Messsage">
          <div className="userName">
            <div>{this.state.name}</div>
          </div>
          <div class="yours messages">
            <div class="message last">{this.props.text}</div>
          </div>
        </div>
      </div>
    )
  }

  // render() {
  //   return (
  //     <div className="flex-container">
  //       <div>
  //         <img src="/Resources/boom_2.jpg" alt="Avatar" class="right" />
  //       </div>
  //       <div className="userName-Messsage">
  //         <div className="userName">I am Boom, I love Esther</div>
  //         <div class="yours messages">
  //           <div class="message last">{this.props.message}</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
}

export default Message;
