import React, { Component } from 'react';
import './Game.css';

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
      />
    </div>
  );
}

export class ControlPanel extends Component {
  render() {
    return (
      <div className="controlPanel">

        <StartButton onClick={this.props.startGame} enableControls={this.props.enableControls}/>
        <StrictButton onClick={this.props.toggleStrict} enableControls={this.props.enableControls}/>
        <OnOffButton onClick={this.props.toggleOnOffButton} gameState={this.props.gameState} enableControls={this.props.enableControls}/>

      </div>
    );
  }
}
