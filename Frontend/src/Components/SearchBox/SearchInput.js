import React, { Component } from 'react'
import './SearchInput.css';

class SearchInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchText: ''};
    }

    handleInputChange = () => {
        this.setState({searchText: this.search.value})
    }

    render() {
        return (
            <form>
                <div className="column">
                <input
                    placeholder="Search for Group"
                    ref = {input => this.search = input}
                    onChange = {this.handleInputChange}
                    className='search-input'
                />
                <p>{this.state.query}</p>
                </div>
                <div className="column">
                <button>search</button>
                </div>
            </form>
        )
    }
}

export default SearchInput;