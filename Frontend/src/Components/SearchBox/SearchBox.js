import React from 'react';
import SearchResult from './SearchResult';
import './SearchBox.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          searchText: '',
          groupFound: null,
          groupIdFound: null,
        };
      this.handleSearch = this.handleSearch.bind(this);
    }

    handleInputChange = () => {
        this.setState({searchText: this.search.value})
    }

    handleSearch(e) {
        axios.get(`http://localhost:8080/groups/findbyname/${this.state.searchText}`)
        .then(res => {
            console.log(res);
            this.setState({groupFound: res.data.name, groupIdFound: res.data._id})
        })
        .catch((error) => {
            this.setState({groupFound: null, groupIdFound: null});
            console.log(error);
        });
        console.log('asdsad')
    }

    render() {
        let result;
        if(this.state.groupFound){
            result = <div><h2> Results:</h2><h3><SearchResult className="search-result" groupname={this.state.groupFound} groupId={this.state.groupIdFound} userid = {this.props.id}></SearchResult></h3></div>
            console.log(this.state.groupIdFound)
        } else {
            result = <div><h2> Results:</h2><h3>     Not Found</h3></div>
        }
        return <div className="a">
            <div className="search-header">Search</div>
            <div className="search-container row">
                <div className="first-column column">
                <input
                    placeholder=" Search for Group..."
                    ref = {input => this.search = input}
                    onChange = {this.handleInputChange}
                    className='search-input'
                />
                <p>{this.state.query}</p>
                </div>
                <div className="second-column column">
                <button className="search-button" onClick={this.handleSearch}><FontAwesomeIcon icon={['fas', 'search']} type="submit"/></button>
                </div>
            </div>
            {result}
        </div>
    }

}

export default SearchBox;