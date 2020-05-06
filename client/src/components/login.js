import React, {Component} from 'react';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: ''
        }
    }


    onSubmit = (event) =>{
        event.preventDefault()
    }

    register = ()=>{
        let errors = this.state.errors;
        return(
            <div className=''>
                <h6><b>Create an Account</b></h6>
                <form noValidate onSubmit={this.onSubmit} className="col s12">
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="text"
                            placeholder="Foo Bar"
                        />
                        <label class='active' style={{paddingBottom: '40px'}} htmlFor="name">Your Name</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            placeholder="foo@bar.com"
                        />
                        <label className='active' htmlFor="email">Your Email Address</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                        />
                        <label className='active' htmlFor="password">Create a Password</label>
                    </div>
                </form>
            </div>

        )
    }

    render() {
        return (
            <div className='row card grey lighten-3'>
                <div className='row'>
                    <div className='col s12'>
                        {this.register()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;