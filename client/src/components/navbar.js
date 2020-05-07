import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <div className='navbar-fixed'>
                <nav className='z-depth-0 teal lighten-2'>
                    <a className="brand-logo left" style={{paddingLeft: '50px'}}>Home</a>
                </nav>
            </div>
        );
    }
}

export default Navbar;