import React, { Component } from 'react';
import './Game.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function Pad(props) {
  return (
    <button
      id="pad"
      className="btn"
      style={{backgroundColor:props.color}}
      value={props.key}
      onClick={props.onClick}
    />
  );
}

export class Board extends Component {
  render() {

    return (
      <div>
      <div >
        <Pad color="#ff4793" onClick={() => this.props.onClick("0")}/>
        <Pad color="#ffb437" onClick={() => this.props.onClick("1")}/>
        </div>
        <div>
        <Pad color="#47ffb3" onClick={() => this.props.onClick("2")}/>
        <Pad color="#4793ff" onClick={() => this.props.onClick("3")}/>
        </div>
      </div>
      // <section>
      //   <div className></div>
      //   <div></div>
      //   <div></div>
      //   <div></div>
      // </section>
    );
  }
}
