import React, {Component} from 'react';
import app from './base'


class TeamMembers extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            age: ''
        };
        console.log(props.db)
        this.firebaseRef = app.database().ref("teamMates");
    }

    componentWillUnmount() {
        this.firebaseRef.off();
    }

    pushToFirebase(event) {
        const {name, age} = this.state;
        event.preventDefault();
        this.firebaseRef.child(name).set({name: this.state.name, age: this.state.age});
        this.setState({name: '', age: ''});
        console.log(this.firebaseRef.child(name))
        this.setState();
    }

    render(){
        return(
            <div>
                <label>Friend's Name</label>
                <input onChange= {e => this.setState({name : e.target.value})} />
                <br />
                <label>Friend's Age</label>
                <input onChange= {e => this.setState({age : e.target.value})} />
                <br />
                <button onClick={this.pushToFirebase.bind(this)}>Submit</button>
            </div>
        );
    }
}

export default TeamMembers;