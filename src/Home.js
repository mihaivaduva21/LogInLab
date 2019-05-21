import React, {Component} from "react";
import app from "./base";
import TeamMembers from "./TeamMembers";
import DisplayData from "./DisplayData";
import firebase from "firebase";
import { Redirect } from "react-router-dom"

class Home extends Component {
  
  constructor(props){
    super(props)
  }


  render(){
      return (
        <>
          <h1>Home</h1>
          <button onClick={() => app.auth().signOut()}>Sign Out</button>

          <div className="Home">
            <TeamMembers db={app}/>
            <DisplayData db={app}/>
          </div>
      </>
    )
  }  
};

export default Home;
