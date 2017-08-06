import React, { Component } from 'react';
import './Game.css';
import {Board} from './Board.js';
import {ControlPanel} from './ControlPanel.js';


class Game extends Component {
  constructor() {
    super();
    this.state = {
      currentCount: 0,
      strict: false,
      gameState: "off",
      currentPattern: [],
      userInput: [],
      disableControls: true,
      currentLevel: 18,
    }

    this.winnerCount = 20;
  }

  addToPattern() {

    var nextPadToClick = Math.floor(Math.random() * 4);
    let updatedPattern = this.state.currentPattern.slice();
    updatedPattern.push(nextPadToClick);



    this.setState({
      currentPattern: updatedPattern,

    })

    var files = [];
    for (var i = 0; i < updatedPattern.length; i++) {
      files.push(soundTracks[updatedPattern[i]]);
    }

    var audioPlayer = new Audio();

    this.playList(audioPlayer, files, true);

  }

  playMusic(audioPlayer, file) {
    return new Promise( resolve => {
      audioPlayer.src = file;
      audioPlayer.addEventListener('ended', () => resolve(true));
      audioPlayer.play();
    })
  }

  async playList (audioPlayer, files, playAllPatterns) {

      for (let i = 0; i < files.length; i++) {
        await this.playMusic(audioPlayer, files[i]);
      }


  };

  toggleOnOffButton() {

    let newGameState;

    if(this.state.gameState === "off") {
      newGameState = "on";

    } else {
      newGameState = "off";
    }

    var newPattern = [];

    this.setState({
      gameState: newGameState,
      disableControls: !this.state.disableControls,
      currentPattern: newPattern,
    })
  }

  async handlePadClick(num) {
    let newCount = this.state.currentCount + 1;
    const isCorrectPad = await this.checkCorrectPad(num, newCount);
    if(isCorrectPad){

        if(this.finishCycle(newCount)) {

          this.addToPattern();


        }

    }
  }

  finishCycle(newCount) {

    if (newCount === this.state.currentPattern.length) {
      let nextLevel = this.state.currentLevel + 1;
      this.setState({
        currentCount: 0,
        currentLevel: nextLevel,
      })

      if(nextLevel === this.winnerCount) {
        alert("You have won. You are wonderful!");
        return;
      }

      return true;
    } else {
      return false;
    }
  }

  async checkCorrectPad(num, newCount) {


    var audioPlayer = new Audio();
    var file=[];
    if (parseInt(num, 10) !== this.state.currentPattern[this.state.currentCount]) {
      file = ["http://www.wavsource.com/snds_2017-07-30_6786517629734627/sfx/thunk.wav"];
      await this.playList(audioPlayer, file);

      this.setState({
        currentCount: 0,
      })

      return false;

    } else {
      file = [soundTracks[num]];
      await this.playList(audioPlayer, file);

      this.setState({
        currentCount: newCount,
      })

      return true;


    }


  }


  startGame() {
    var newPattern = [];
    this.setState({
      currentPattern: newPattern,
    })

    this.addToPattern();
  }

  toggleStrict() {

    this.setState({
      strict: !this.state.strict,
    })
  }

  render() {
    console.log(this.state.currentPattern);
    return (
      <div>

        <div className="mainContainer">
          <h1>Simon Says</h1>
          <Board className="boardContainer" onClick={this.handlePadClick.bind(this)}/>
          <ControlPanel toggleOnOffButton={this.toggleOnOffButton.bind(this)}
                        enableControls={this.state.disableControls}
                        gameState={this.state.gameState}
                        startGame={this.startGame.bind(this)}
                        toggleStrict={this.toggleStrict.bind(this)}/>
        </div>

      </div>
    );
  }
}

const soundTracks = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
                     "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
                     "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
                     "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];


export default Game;
