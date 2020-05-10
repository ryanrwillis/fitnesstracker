import React, {Component} from 'react';

class Navbar extends Component {
    render() {
        return (
            <div className='navbar-fixed'>
                <nav className='z-depth-0 teal lighten-2'>
                    <a className="brand-logo right" style={{paddingLeft: '50px'}}>Home</a>
                    <button
                        style={{
                            paddingLeft: '20px',
                            width: "180px",
                            borderRadius: "3px",
                            letterSpacing: "1px",
                            marginTop: "0.5rem",
                            marginBottom: '0.5rem'
                        }}
                        className="btn btn-small waves-effect waves-light hoverable teal ligthen-3"
                    >
                        Add New Exercise
                    </button>
                </nav>
            </div>
        );
    }
}

export default Navbar;