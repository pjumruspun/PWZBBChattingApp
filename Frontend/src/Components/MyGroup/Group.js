import React from 'react';
import './Group.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Group extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
        }

    }

    componentDidMount(){
        
    }

    render() {
        return (
            <div className='group-container'>
                <div className='group-name'>{this.props.groupname}</div>
                <div>
                    <button className='read-button' onClick={this.props.handleRead.bind(this,this.props.groupid)}><FontAwesomeIcon icon={['fas', 'book-reader']} type="submit"/><br/>read</button>
                    <button className='getUnread-button' onClick={this.props.handleUnread.bind(this,this.props.groupid)}><FontAwesomeIcon icon={['fas', 'flag-checkered']} type="submit"/><br/>getUnread</button>
                    <button className='leave-button' onClick={this.props.handleLeave.bind(this,this.props.groupid)}><FontAwesomeIcon icon={['fas', 'heart-broken']} type="submit"/><br/>Leave</button>
                </div>
            </div>
        );
    }
}

export default Group;