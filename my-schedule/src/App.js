import React from 'react';
import Tabletop from "tabletop";
import './App.css';
import Table from './Table';
import { signInWithGoogle } from './services/firebase';
import { auth } from './services/firebase';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null,
      data: []
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
    
    Tabletop.init({
      key: '1R4GVfo2urpejFWNIHqABghlxady-qzRtIrpMotlaW4I',
      callback: googleData => {
          this.setState({
          data: googleData
          })
      },
      simpleSheet: true
      })
  }

  get_name(){
    let name=""
    this.state.data.map(obj => {
      if (obj.Email == this.state.currentUser.email) {
        name=obj.Name 
      }
    })
    return name
  }

  render() {
    const {data} = this.state.data;

    return (
      <div>
        {
          this.state.currentUser ?
  
          (
            <div>
              <div>Name: {this.state.currentUser.displayName}</div>
              <div>Email: {this.state.currentUser.email}</div>
              {console.log(this.get_name())}
              <Table name={this.get_name()}/>
            </div>
          ):
          
          <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>

        }
      </div >
    );
  }
}


export default App;