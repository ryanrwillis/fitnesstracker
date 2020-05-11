import React, {Component} from 'react';
import Login from '../login'

class Landing extends Component {

    updateRouterState = (data) =>{
        this.props.callback(data);
    }

    render() {
        return (
            <div style ={{height: '100vh'}} className='container row valign-wrapper'>
                    <div className='col s4 offset-s1 center-align gradient-div'>
                        <h1 className='white-text'>
                            MERN Fitness Tracker
                        </h1>
                        <h3 className='white-text'>with graphs!</h3>
                    </div>
                    <div className='col s6 center-align'>
                        <Login callback={this.updateRouterState}/>
                    </div>
            </div>
        );
    }
}

export default Landing;