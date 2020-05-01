import React from "react";
import "./MyMessage.css";
import axios from 'axios';

class MyMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
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
      <div class="mine messages flex-container" id="my_message">
        <div className="userName">
            <div>{this.state.name}</div>
          </div>
          <div class="yours messages">
            <div class="message last">{this.props.text}</div>
          </div>
      </div>
    );
  }
}

export default MyMessage;
