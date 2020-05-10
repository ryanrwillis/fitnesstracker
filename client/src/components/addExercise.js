import React, {Component} from 'react';
import classnames from "classnames";
const axios = require('axios');
const qs = require('querystring');

class AddExercise extends Component {
    // Props: token
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            name: '',
            errors: {},
        }
    }

    handleCollapse = (event) =>{
        event.preventDefault()
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    addButton = () =>{
        const buttonText = this.state.collapsed ? 'Add New Exercise' : 'Cancel';
        return(
            <button
                style={{
                    width: "180px",
                    borderRadius: "3px",
                    letterSpacing: "1px",
                    marginTop: "0.5rem",
                    marginBottom: '0.1rem'
                }}
                className="btn btn-small waves-effect waves-light hoverable teal ligthen-3"
                onClick={this.handleCollapse}
            >
                {buttonText}
            </button>
        )
    }

    onChange = (event) =>{
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value})
    }

    addExercise = (event) =>{
        event.preventDefault();
        axios({
            method: 'post',
            url: '/api/secure/workout/add',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': this.props.token
            },
            data: qs.stringify({name: this.state.name})
        }).then(res =>{
            this.setState( {
                collapsed: true,
                name: '',
                errors: {},
            })
            this.props.callback();
            //TODO : callback
        }).catch(error =>{
            if(error.hasOwnProperty('response')){
                this.setState({
                    errors: error.response['data']
                })
            }

        })
        }

    renderForm = () =>{
        const errors = this.state.errors;
        if(!this.state.collapsed) {
            return (
                <div  className='row' style={{
                    marginBottom: '2rem'
                }}>
                    <form noValidate onSubmit={this.addExercise}>
                        <div className='col s6 offset-s3'>
                            <label className='active' htmlFor="name">Name Your Exercise</label>
                            <input
                                className={classnames("", {
                                invalid: errors.name
                                })}
                                style = {{marginBottom: '0rem'}}
                                   onChange={this.onChange}
                                   value={this.state['name']}
                                   error={errors.name}
                                   id="name"
                                   type="text"/>
                            <span className="red-text" style={{fontSize: '10px', }}>{errors.name}</span>
                        </div>
                        <div className='col s12'>
                            <button id='name' style={{marginTop: '1rem'}} className='btn-small'>Submit</button>
                        </div>

                    </form>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.addButton()}
                {this.renderForm()}
            </div>
        );
    }
}

export default AddExercise;