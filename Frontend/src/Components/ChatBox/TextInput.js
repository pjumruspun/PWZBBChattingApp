import React from "react";
import "./TextInput.css";
import { faHome, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";


class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: '',
    };
    library.add(fas);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e) {
    console.log(this.props.id)
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    console.log(this.state.message)
    Axios
      .post("http://localhost:8080/messages", {
        "content": this.state.message,
         "sender": this.props.id,
         "group": this.props.group
      })
      .then((response) => {
        console.log(response);
        // this.myCars = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      document.getElementById("username").value = "";
      this.setState({
        message: ''
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            className="chat-input"
            value={this.state.message}
            onChange = {this.handleChange}
            placeholder="Type your message and hit ENTER..." 
            type="text" id="username" name="username" />
          <button className="btn"><FontAwesomeIcon icon={['fas', 'paper-plane']} type="submit"/></button>
        </form>
      </div>
    );
  }
}

export default TextInput;
