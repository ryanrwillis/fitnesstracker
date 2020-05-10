import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
const axios = require('axios');
const qs = require('querystring');

class ExerciseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    renderExpanded = () =>{
        // TODO
        if(this.state.expanded) {
            return (
                <div className='col s12'>
                    <h1> Foo </h1>
                    <h1> Bar</h1>
                </div>
            )
        }
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

    handleExpand = (event) =>{
        event.preventDefault()
        this.setState({
            expanded: !this.state.expanded
        })
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