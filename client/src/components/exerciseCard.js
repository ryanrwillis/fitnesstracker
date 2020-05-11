import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { Chart } from 'react-charts'
import classnames from "classnames";
import Graph from "./graph";
const axios = require('axios');
const qs = require('querystring');

class ExerciseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workout: this.props.workout,
            expanded: false,
            reps: '',
            sets: '',
            weight: '',
            errors: {}
        }
    }

    onChange = (event) =>{
        event.preventDefault();
        this.setState({[event.target.id]: event.target.value})
    }

    handleWorkoutEntrySubmit = (event) =>{
        event.preventDefault()
        axios({
            method: 'post',
            url: '/api/secure/workout/update',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': this.props.token
            },
            data: qs.stringify({
                id: this.props.workout._id,
                sets: this.state.sets,
                reps: this.state.reps,
                weight: this.state.weight,
            })
        }).then(res =>{
            this.props.callback();
            this.setState({
                reps:'',
                sets: '',
                weight: '',
                errors: {},
                expanded: false
            })
            this.setState({
                expanded: true
            })
            this.forceUpdate();
            }).catch(error =>{
                if(error.hasOwnProperty('response')) {
                    this.setState({
                        errors: error.response['data']
                    })
                }
            })
    }




    handleDelete = (event) =>{
        event.preventDefault()
        axios({
            method: 'delete',
            url: '/api/secure/workout/remove',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': this.props.token
            },
            data: qs.stringify({id: this.props.workout._id})
        }).then(res =>{
            this.props.callback()
        }).catch(error =>{
            if(error.hasOwnProperty('response')) {
                this.setState({
                    errors: error.response['data']
                })
            }
        })
    }

    renderChart = () =>{
        let dates = [];
        let volume = [];

        this.props.workout.history.forEach(entry =>{
            volume.push(parseInt(entry.sets) * parseInt(entry.reps) * parseInt(entry.weight))
            dates.push(entry.date.split('T')[0])
        })

        return(
            <div>
                <Graph dates={dates} volume={volume} />
            </div>
        )


    }

    handleExpand = (event) =>{
        event.preventDefault()
        this.setState({
            expanded: !this.state.expanded
        })
    }

    renderExpanded = () =>{
        if(this.state.expanded) {
            const errors = this.state.errors;
            return (
                <div className='row'>
                    <div className='col s12 m6'>
                        {this.renderChart()}
                    </div>
                    <div className='col s12 m6 center-align'>
                        <h6 style={{marginTop: '1rem', marginBottom: '1.5rem'}}>Add New Log Entry</h6>
                        <div className='col s10 offset-s1 valign-wrapper'>
                            <form noValidate onSubmit={this.handleWorkoutEntrySubmit}>
                                <div className='col s4 m3'>
                                    <label htmlFor="sets">Sets</label>
                                    <input type='number'
                                           className={classnames("", {
                                               invalid: errors.sets
                                           })}
                                           onChange={this.onChange}
                                           value={this.state.sets}
                                           error={errors.sets}
                                           id="sets" />
                                </div>
                                <div className='col s4 m3'>
                                    <label htmlFor="reps">Reps</label>
                                    <input type='number'
                                           className={classnames("", {
                                               invalid: errors.reps
                                           })}
                                           onChange={this.onChange}
                                           value={this.state.reps}
                                           error={errors.reps}
                                           id="reps" />
                                </div>
                                <div className='col s4 m3'>
                                    <label htmlFor="weight">Weight</label>
                                    <input type='number'
                                           className={classnames("", {
                                               invalid: errors.weight
                                           })}
                                           onChange={this.onChange}
                                           value={this.state.weight}
                                           error={errors.weight}
                                           id="weight" />
                                </div>
                                <div className='col s12 m3 center'>
                                    <button id='submit'
                                            style={{marginTop: '1.8rem'}}
                                            className='btn-small'
                                            type='submit'>
                                        Submit
                                    </button>
                                </div>
                                <div className='col s12'>
                                    <span className="red-text" style={{fontSize: '10px'}}>{errors.sets}</span>
                                </div>
                                <div className='col s12'>
                                    <span className="red-text" style={{fontSize: '10px'}}>{errors.reps}</span>
                                </div>
                                <div className='col s12'>
                                    <span className="red-text" style={{fontSize: '10px'}}>{errors.weight}</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className='col s12 card'>
                <div className='row row-low'>
                    <div className='col s8 m10'>
                        <h5 className='left-align valign-wrapper' style={{marginTop: '9px'}}>{this.props.workout.name}</h5>
                    </div>
                    <div className ='col s4 m2 valign-wrapper' style={{paddingRight: '0px'}}>
                        <IconButton onClick={this.handleDelete}
                                    aria-label="delete"
                                    style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: '20px'}}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={this.handleExpand}
                                    aria-label="expand"
                                    style={{marginTop: 'auto', marginBottom: 'auto', focusVisible: ''}}>
                            <ExpandMoreOutlinedIcon />
                        </IconButton>
                    </div>
                    {this.renderExpanded()}
                </div>
            </div>
        );
    }
}

export default ExerciseCard;