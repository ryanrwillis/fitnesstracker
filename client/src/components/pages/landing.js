import React, {Component} from 'react';
import Login from '../login'

class Landing extends Component {
    updateRouterState = (data) =>{
        this.props.callback(data);
    }

    render() {
        return (
            <div style ={{height: '100vh'}} className='container row valign-wrapper'>
                    <div className='col s6 center-align'>
                        <h4>
                            Fitness Tracker
                        </h4>
                    </div>
                    <div className='col s6 center-align'>
                        <Login callback={this.updateRouterState}/>
                    </div>
            </div>
        );
    }
}

export default Landing;