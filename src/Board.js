import React, { Component } from 'react';
import './Game.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function Pad(props) {
  return (
    <button
      id={props.id}
      className="btn pad"
      style={{backgroundColor:props.color}}
      value={props.key}
      onClick={props.onClick}
      disabled={props.disableControls}
    />
  );
}

export class Board extends Component {
  render() {

    return (
      <div>
      <div >
        <Pad color="#ff4793" id="pad0" onClick={() => this.props.onClick("0")} disableControls={this.props.disableControls}/>
        <Pad color="#ffb437" id="pad1" onClick={() => this.props.onClick("1")} disableControls={this.props.disableControls}/>
        </div>
        <div>
        <Pad color="#47ffb3" id="pad2" onClick={() => this.props.onClick("2")} disableControls={this.props.disableControls}/>
        <Pad color="#4793ff" id="pad3" onClick={() => this.props.onClick("3")} disableControls={this.props.disableControls}/>
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
