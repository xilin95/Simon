import React, { Component } from 'react';
import './Game.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function Pad(props) {

      return (
        <button
          id={props.id}
          className="btn pad"
          style={{backgroundColor: props.color}}
          onClick={props.onClick}
          disabled={props.disableControls}
        />
      );




}

export class Board extends Component {
  render() {
    const colorCollection = [["#fa0067", "#ff4793"],["#ffa104", "#ffb437"],["#38cc8f", "#47ffb3"],["#3875cc", "#4793ff"]];

    let topLeftId = "pad0";
    let topRightId = "pad1";
    let bottomLeftId = "pad2";
    let bottomRightId = "pad3";

    return (
      <div>
      <div >
        <Pad value="0" id={topLeftId} color={this.props.highlightPad === 0 ? colorCollection[0][1] : colorCollection[0][0]} onClick={() => this.props.onClick("0")} disableControls={this.props.disableControls}/>
        <Pad value="1" id={topRightId} color={this.props.highlightPad === 1 ? colorCollection[1][1] : colorCollection[1][0]} onClick={() => this.props.onClick("1")} disableControls={this.props.disableControls}/>
        </div>
        <div>
        <Pad value="2" id={bottomLeftId} color={this.props.highlightPad === 2 ? colorCollection[2][1] : colorCollection[2][0]} onClick={() => this.props.onClick("2")} disableControls={this.props.disableControls}/>
        <Pad value="3" id={bottomRightId} color={this.props.highlightPad === 3 ? colorCollection[3][1] : colorCollection[3][0]} onClick={() => this.props.onClick("3")} disableControls={this.props.disableControls}/>
        </div>
      </div>

    );
  }
}
