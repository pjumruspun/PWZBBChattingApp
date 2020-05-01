import React from "react";
import "./MyGroup.css";
import Group from "./Group";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MyGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      groupName: "",
      groupID: "",
    };
    this.handleGroupnameChange = this.handleGroupnameChange.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }

  componentDidMount() {}

  createGroup() {
    console.log(this.state.groupID);
    axios
      .post("http://localhost:8080/groups", {
        name: this.state.groupName,
        client: [],
        message: [],
      })
      .then((response) => {
        console.log(response);
        axios
          .put(
            `http://localhost:8080/groups/${response.data._id}/client/add/${this.props.userId}`
          )
          .then((res) => {
            console.log(res);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleGroupnameChange() {
    this.setState({
      groupName: document.getElementById("create-group").value,
    });
  }

  render() {
    return (
      <div className="MyGroup-container">
        <div className="MyGroup-header">My Groups</div>
        <div class="create-group-container row">
          <div className="column first-column">
            <input
              placeholder=" Insert group name..."
              id="create-group"
              onChange={this.handleGroupnameChange}
            ></input>
          </div>
          <div className="column second-column">
            <button className="create-group-button" onClick={this.createGroup}><FontAwesomeIcon icon={['fas', 'plus']} type="submit"/></button>
          </div>
        </div>
        
        <h1> <br></br></h1>

        <div className="GroupList">
          {this.props.groupList.map((group) => {
            return (
              <Group
                handleRead={this.props.handleRead}
                handleUnread={this.props.handleUnread}
                handleLeave={this.props.handleLeave}
                groupname={group.gname}
                groupid={group.gid}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default MyGroup;
