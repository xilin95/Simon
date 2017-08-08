import React, { Component } from 'react';
import './Game.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function StartButton(props) {
  return (
    <div id="startWrapper">
      <p>Start</p>
      <button
        id="startButton"
        className="btn"
        onClick={props.onClick}
        disabled={props.enableControls}
      />
    </div>
  );
}

function OnOffButton(props) {
  var display = (props.gameState === "off" ? "Turn Game On" : "Turn Game Off")
  return (
    <button
      id="onOffButton"
      className="btn btn-outline-primary"
      onClick={props.onClick}
    >
      {display}
    </button>
  );
}

function StrictButton(props) {
  return (
    <div id="startWrapper">
      <p>Strict</p>
      <button
        id="strictButton"
        className="btn"
        onClick={props.onClick}
        disabled={props.enableControls}
      />
    </div>
  );
}

function CountDisplay(props) {
  return (

    <div className="card card-inverse">
      <div className="card-block">
        <h7 className="card-title">Level: {props.value + 1}</h7>
      </div>
    </div>

  );
}

export class ControlPanel extends Component {
  render() {
    return (
      <div className="controlPanel">

        <CountDisplay value={this.props.currentLevel}/>
        <StartButton onClick={this.props.startGame} enableControls={this.props.enableControls}/>
        <StrictButton onClick={this.props.toggleStrict} enableControls={this.props.enableControls}/>
        <OnOffButton onClick={this.props.toggleOnOffButton} gameState={this.props.gameState} enableControls={this.props.enableControls}/>

      </div>
    );
  }
}
