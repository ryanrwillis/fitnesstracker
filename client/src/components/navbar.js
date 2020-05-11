import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <div className='navbar-fixed'>
                <nav className='z-depth-0 teal lighten-2'>
                    <h4 className="center-align" style={{marginTop: '11px'}}>MERN Fitness Tracker</h4>
                </nav>
            </div>
        );
    }
}

export default Navbar;