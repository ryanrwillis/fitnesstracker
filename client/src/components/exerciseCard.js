import React, {Component} from 'react';

class ExerciseCard extends Component {
    render() {
        return (
            <div className='col s12 card'>
                <h5 className='center-align'>{this.props.workout.name}</h5>
            </div>
        );
    }
}

export default ExerciseCard;