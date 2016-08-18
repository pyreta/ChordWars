const ReactDOM = require('react-dom');
const React = require('react');
const Piano =  require("./components/piano");
const ChordWindow =  require("./components/chord_window");
const ProgressBar =  require("./components/progress_bar");
const ScoreBoard =  require("./components/score_board");
const Controls =  require("./components/controls");
const chordFunctions = require("./util/chord_functions");

const App = React.createClass({

  timeState() {
    let pDec = this.state.timer/this.timeLength;
    return (pDec*100).toString() + "%";
  },

  healthState() {
    let pDec = this.state.health/this.healthLength;
    return (pDec*100).toString() + "%";
  },

  getInitialState(){
    return {
      healthPercent: "0%",
      timerPercent: "0%",
      timer: 0,
      health: 0,
      gameOver: false,
      chord: chordFunctions.generate()
    };
  },

  componentDidMount(){
    // this.startTimer();
  },

  componentWillMount(){
    this.timeLength = 2000;
    this.healthLength = 10000;
  },

  incrementHealth(amount){
    let goal = this.state.health + (amount*1000);
    this.healthIntervalId = setInterval(()=>{
      let newHealth = this.state.health+=100;
      this.setState({health: newHealth, healthPercent: this.healthState()});
      if ((newHealth >= this.healthLength) || (newHealth >= goal)){
        clearInterval(this.healthIntervalId);
      } if ( this.state.healthPercent === "100%" ){
        this.gameOver();
      }
    },1);
  },

  healthTest(){
    this.incrementHealth(2);
  },

  nextChord(){
    this.setState({ chord: chordFunctions.generate() });
  },

  startTimer(){
    let now = new Date();
    let nowSeconds = now.getTime();
    this.timeIntervalId = setInterval(()=>{
      let newTime = new Date().getTime() - nowSeconds;
      this.setState({timer: newTime, timerPercent: this.timeState()});
      if (newTime >= this.timeLength){
        clearInterval(this.timeIntervalId);
        this.incrementHealth(this.state.chord.notes.length-2);
        if (!this.state.gameOver){
          this.startTimer();
          this.nextChord();
          console.log(chordFunctions.randomNote());
          console.log(chordFunctions.randomVoice());
        }
      }
    }, 1);
  },

  restartTimer(){
    clearInterval(this.timeIntervalId);
    this.startTimer();
  },

  gameOver(){
    clearInterval(this.timeIntervalId);
    this.setState({ gameOver: true, chord: {note: ":", voice: "", other: "(", notes: []} });
  },

  render() {

    return (
        <div>
          <div className="group windows">
            <ChordWindow chord={ this.state.chord }/>
            <ScoreBoard />
          </div>

          <ProgressBar restart={this.restartTimer} className="timer" width={ this.state.timerPercent } color="#56b6c2"/>
          <ProgressBar restart={this.healthTest} className="health" width={ this.state.healthPercent } color="red"/>
          <Piano />
        </div>
    );
  }
});


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.querySelector("#content"));
});
