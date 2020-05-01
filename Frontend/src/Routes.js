import { Switch, Route, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import App from './Components/FirstPage/App';
import ChatBox from './Components/ChatBox/ChatBox';
import MyGruop from './Components/MyGroup/MyGroup';
import SearchBox from './Components/SearchBox/SearchBox';
import ChatPage from './Components/ChatPage/ChatPage';


class Routes extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>The Best Group Chat Application</title>
                </Helmet>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route exact path="/ChatBox" component={ChatBox} />
                        <Route exact path="/MyGroup" component={MyGruop} />
                        <Route exact path="/SearchBox" component={SearchBox}/>
                        <Route exact path="/ChatPage" component={ChatPage}/>

                    </Switch>
                </BrowserRouter>
                
            </div>
        )
    }
}

export default Routes;