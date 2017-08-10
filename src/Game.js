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
      highlightPad: -1,
  
    }

    this.winnerCount = 20;
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
          var newPattern = this.state.currentPattern.slice();
          this.addToPattern(newPattern);
        }

    }
  }

  async checkCorrectPad(num, newCount) {
    this.setState({
      disableControls: true,
    })
    var audioPlayer = new Audio();
    var file=[];
    if (parseInt(num, 10) !== this.state.currentPattern[this.state.currentCount]) {
      file = ["http://www.wavsource.com/snds_2017-07-30_6786517629734627/sfx/thunk.wav"];
      await this.playList(audioPlayer, file, null);

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

        await this.playList(audioPlayer, files, this.state.currentPattern);
      }

      return false;
    } else {
      file = [soundTracks[num]];
      await this.playList(audioPlayer, file, null);
      this.setState({
        currentCount: newCount,
      })
      return true;
    }
  }

  async playList (audioPlayer, file, highlightPadSequence) {

      for (let i = 0; i < file.length; i++) {
        if(highlightPadSequence !== null) {

          let nextPad = highlightPadSequence[i];

          this.setState({
            highlightPad: nextPad,
          })
        }

        await this.playMusic(audioPlayer, file[i]);

        this.setState({
          highlightPad: -1,
          disableControls: false,
        })

        await this.setTimeoutPromise();

      }




  };

  playMusic(audioPlayer, file) {
    return new Promise( resolve => {
      audioPlayer.src = file;
      audioPlayer.addEventListener('ended', () => resolve(true));
      audioPlayer.play();

    })
  }

  setTimeoutPromise() {
    return new Promise(function(resolve) {
        setTimeout(resolve, 200);
    });
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

  addToPattern(newPattern) {

    var nextPadToClick = Math.floor(Math.random() * 4);
    newPattern.push(nextPadToClick);



    this.setState({
      currentPattern: newPattern,

    })

    var files = [];
    for (var i = 0; i < newPattern.length; i++) {
      files.push(soundTracks[newPattern[i]]);
    }

    var audioPlayer = new Audio();

    this.playList(audioPlayer, files, newPattern);

  }

  startGame() {
    var newPattern = [];
    var newLevel = 0;
    this.setState({
      currentPattern: newPattern,
      currentLevel: newLevel,
    })

    this.addToPattern(newPattern);
  }

  toggleStrict() {

    this.setState({
      strict: !this.state.strict,
    })
  }

  isHighlightOn() {
    if(this.state.highlightOn) {
      return 1;
    } else {
      return 0;
    }
  }

  render() {
    console.log(this.state.currentPattern);
    return (
      <div>

        <div className="mainContainer">
          <h1>Simon Says</h1>
          <Board className="boardContainer" onClick={this.handlePadClick.bind(this)}
                                            disableControls={this.state.disableControls}
                                            highlightPad={this.state.highlightPad}/>

          <ControlPanel toggleOnOffButton={this.toggleOnOffButton.bind(this)}
                        enableControls={this.state.disableControls}
                        gameState={this.state.gameState}
                        startGame={this.startGame.bind(this)}
                        toggleStrict={this.toggleStrict.bind(this)}
                        currentLevel={this.state.currentLevel}
                        />
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
