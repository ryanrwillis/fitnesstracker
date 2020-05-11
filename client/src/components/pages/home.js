import React, {Component} from 'react';
import Navbar from "../navbar";
import AddExercise from "../addExercise";
import ExerciseCard from "../exerciseCard";
const axios = require('axios')

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workouts: []
        }
    }

    componentDidMount() {
        this.getWorkouts();
    }

    getWorkouts = () =>{
        axios({
            method: 'get',
            url: '/api/secure/workout/get-all',
            headers: {
                'Authorization': this.props.token
            }
        }).then(res =>{
            this.setState({
                workouts: res.data
            })
        }).catch(error =>{
            // TODO
        })
    }

    getWorkoutCards = () =>{
        const workouts = this.state.workouts;

        const cards = workouts.map(workout =>
            <ExerciseCard key={workout._id} workout={workout} callback={this.getWorkouts} token={this.props.token}/>
        )
        return(
            <div>
                {cards}
            </div>
        );
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='container col s10 offset-s1'  >
                    <div className='row' >
                        <div className='col s12 center'>
                            <AddExercise token={this.props.token} callback={this.getWorkouts}/>
                        </div>
                        {this.getWorkoutCards()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;