import React, {Component} from 'react';
import Navbar from "../navbar";

class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className='container'>
                    <div className='row'>
                        <div className='col s6 card'>
                            <h1 className='center-align'>Add Workout</h1>
                        </div>
                        <div className='col s6'>
                            <h1 className='center-align'>Add Workout</h1>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;