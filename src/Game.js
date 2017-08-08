import React, { Component } from 'react';
import './Game.css';
import {Board} from './Board.js';
import {ControlPanel} from './ControlPanel.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


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
      currentLevel: 0,
      padColor: 0,
    }

    this.winnerCount = 3;
  }

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
      currentLevel: 0,
      currentCount: 0,
      strict: false,
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

  async checkCorrectPad(num, newCount) {
    var audioPlayer = new Audio();
    var file=[];
    if (parseInt(num, 10) !== this.state.currentPattern[this.state.currentCount]) {
      file = ["http://www.wavsource.com/snds_2017-07-30_6786517629734627/sfx/thunk.wav"];
      await this.playList(audioPlayer, file);

      if(this.state.strict) {
        this.setState({
          currentCount: 0,
          currentPattern: [],
          currentLevel: 0,
        })

        this.startGame();
      } else {
        this.setState({
          currentCount: 0,
        })

        var files = [];
        for (var i = 0; i < this.state.currentPattern.length; i++) {
          files.push(soundTracks[this.state.currentPattern[i]]);
        }

        await this.playList(audioPlayer, files);
      }

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

  async playList (audioPlayer, file) {

      for (let i = 0; i < file.length; i++) {
        await this.playMusic(audioPlayer, file[i]);
      }


  };

  playMusic(audioPlayer, file) {
    return new Promise( resolve => {
      audioPlayer.src = file;
      audioPlayer.addEventListener('ended', () => resolve(true));
      audioPlayer.play();
    })
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
        this.toggleOnOffButton();
        return;
      }

      return true;
    } else {
      return false;
    }
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

    this.playList(audioPlayer, files);

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

  changeColor(num) {
    let newColor;

    if(this.state.padColor === 0) {
      newColor = 1;
    } else {
      newColor = 0;
    }

    this.setState({
      padColor: newColor,
    })

    return padColor[num[newColor]];
  }

  render() {
    console.log(this.state.currentPattern);
    return (
      <div>

        <div className="mainContainer">
          <h1>Simon Says</h1>
          <Board className="boardContainer" onClick={this.handlePadClick.bind(this)}
                                            padColor={this.changeColor.bind(this)}
                                            disableControls={this.state.disableControls}/>
          <ControlPanel toggleOnOffButton={this.toggleOnOffButton.bind(this)}
                        enableControls={this.state.disableControls}
                        gameState={this.state.gameState}
                        startGame={this.startGame.bind(this)}
                        toggleStrict={this.toggleStrict.bind(this)}
                        currentLevel={this.state.currentLevel}/>
        </div>

      </div>
    );
  }
}

const soundTracks = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
                     "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
                     "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
                     "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];

const padColor = [["#ff4793", "#fa0067"],[],[],[]];


export default Game;
