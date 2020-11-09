import React from 'react';
import Tabletop from "tabletop";
import './App.css';
import Table from './Table';

//To get the full name based on email from the "Data Sales" sheets
class GetName extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
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

  get_name(email){
    let name=""
    this.state.data.map(obj => {
      if (obj.Email === email) {
        name=obj.Name 
      }
    })
    return name
  }

  render() {
    return <div><Table name={this.get_name(this.props.name)}/></div>
    }
}
export default GetName;