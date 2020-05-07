import React, {Component} from 'react';
import classnames from "classnames";
const axios = require('axios')
const qs = require('querystring')

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            type: 'register',
            name: '',
            email: '',
            password: '',
            password2: '',
        }
    }

    switchType = (event) =>{
        if(event) {
            event.preventDefault();
        }
        if(this.state.type === 'register') this.setState({type: 'login'})
        else this.setState({type: 'register'})

        this.setState({
            errors: {}
        })
    }

    renderType = () =>{
        if(this.state.type === 'register'){
            return this.register();
        } else{
            return this.login();
        }
    }

    onChange = (event) =>{
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value})
    }

    onRegister = (event) =>{
        event.preventDefault();
        const registerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        axios({
            method: 'post',
            url: '/api/users/register',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(registerData)
        }).then(res =>{
            this.switchType()
        }).catch(error =>{
            if(error.hasOwnProperty('response')) {
                this.setState({
                    errors: error.response['data']
                })
            }
        })
    }

    onSignIn = (event) =>{
        event.preventDefault()
        const loginData = {
            email: this.state['login-email'],
            password: this.state['login-password']
        };
        axios({
            method: 'post',
            url: '/api/users/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(loginData)
        }).then(res =>{
            this.props.callback({
                token: res.token,
                index: 'home'
            });
        }).catch(error =>{
            if(error.hasOwnProperty('response')) {
                this.setState({
                    errors: error.response['data']
                })
            }
        })
    }

    login = ()=>{
        let errors = this.state.errors;
        return(
            <div className=''>
                <h5 style={{paddingBottom: '20px'}}><b>Sign In</b></h5>
                <form style={{paddingBottom: '20px'}} noValidate onSubmit={this.onSignIn}
                      className="col s10 offset-s1">
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state['login-email']}
                            error={errors.email}
                            id="login-email"
                            type="email"
                        />
                        <label className='active' htmlFor="email">Your Email Address</label>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state['login-password']}
                            error={errors.password}
                            id="login-password"
                            type="password"
                        />
                        <label className='active' htmlFor="password">Password</label>
                    </div>
                    <button
                        style={{
                            width: "200px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-small waves-effect waves-light hoverable teal ligthen-3"
                    >
                        Sign In
                    </button>
                </form>
                <button
                    style={{
                        width: "200px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    type="button"
                    className="btn btn-small waves-effect waves-light hoverable teal ligthen-3"
                    onClick={this.switchType}
                >
                    Sign Up Here
                </button>
            </div>
        )
    }

    register = ()=>{
        const { errors } = this.state;
        return(
            <div className=''>
                <h5 style={{paddingBottom: '20px'}}><b>Create an Account</b></h5>
                <form style={{paddingBottom: '20px'}} noValidate onSubmit={this.onRegister} className="col s10 offset-s1">
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.name}
                            error={errors.name}
                            id="name"
                            type="text"
                            className={classnames("", {
                                invalid: errors.name
                            })}
                        />
                        <label className='active' htmlFor="name">Your Name</label>
                        <span className="red-text" style={{fontSize: '10px'}}>{errors.name}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames("", {
                                invalid: errors.email
                            })}
                        />
                        <label className='active' htmlFor="email">Your Email Address</label>
                        <span className="red-text" style={{fontSize: '10px'}}>{errors.email}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password
                            })}
                        />
                        <label className='active' htmlFor="password">Password</label>
                        <span className="red-text" style={{fontSize: '10px'}}>{errors.password}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                            onChange={this.onChange}
                            value={this.state.password2}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                        />
                        <label className='active' htmlFor="password">Confirm Password</label>
                        <span className="red-text" style={{fontSize: '10px'}}>{errors.password2}</span>
                    </div>
                    <button
                        style={{
                            width: "200px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-small waves-effect waves-light hoverable teal ligthen-3"
                    >
                        Sign up
                    </button>
                </form>
                <h6>Already have an account?</h6>
                <button
                    style={{
                        width: "200px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    type="button"
                    className="btn btn-small waves-effect waves-light hoverable teal ligthen-3"
                    onClick={this.switchType}
                >
                    Sign In Here
                </button>
            </div>

        )
    }

    render() {
        return (
            <div className='row card grey lighten-3'>
                <div className='row'>
                    <div className='col s12'>
                        {this.renderType()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;