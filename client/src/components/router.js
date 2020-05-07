import React, {Component} from 'react';
import Landing from "./pages/landing";
import Home from "./pages/home";

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 'landing' // Start on landing page
        }
    }
    upstreamDataChange = (data) =>{
        this.setState(data)
    }
    render() {
        switch(this.state.index){
            case 'landing':
                return <Landing callback={this.upstreamDataChange}/>;
            case 'home':
                return<Home />
            default:
                return <div><h1>Sorry, an error has occurred :(</h1></div>;
        }
    }
}

export default Router;