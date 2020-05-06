import React, {Component} from 'react';
import Landing from "./pages/landing";

class Router extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 'landing' // Start on landing page
        }
    }
    render() {
        switch(this.state.index){
            case 'landing':
                return <Landing/>
            default:
                return <div><h1>Sorry, an error has occurred :(</h1></div>
        }
    }
}

export default Router;