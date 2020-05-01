import React, { Component } from 'react';
import './SearchResult.css';
import Result from './Result';

class SearchResult extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Result className="result" groupname={this.props.groupname} groupid={this.props.groupId} userid={this.props.userid}></Result>
            </div>
        );
    }
}

export default SearchResult;