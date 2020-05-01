import React, { Component } from 'react';
import './Result.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleJoinGroup = this.handleJoinGroup.bind(this);
    }

    handleJoinGroup(){
        axios.put(`http://localhost:8080/groups/${this.props.groupid}/client/add/${this.props.userid}`)
        .then(res => {
            console.log(res)
        })
    }

    render() {
        return (
            <div className="abb row">
                <div className="column group-name">
                    <p>{this.props.groupname}</p>
                </div>
                <div className="column join-button-container">
                    <button className="join-button" onClick={this.handleJoinGroup}><FontAwesomeIcon icon={['fas', 'cannabis']} type="submit"/></button>
                </div>
            </div>
        )
    }
}

export default Result;