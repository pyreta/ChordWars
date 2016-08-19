const ReactDOM = require('react-dom');
const React = require('react');
const Piano =  require("./components/piano");
const ChordWindow =  require("./components/chord_window");
const ProgressBar =  require("./components/progress_bar");
const ScoreBoard =  require("./components/score_board");
const Controls =  require("./components/controls");
const chordFunctions = require("./util/chord_functions");
const MethodModule = require("./util/method_module");
const NoteConstants = require("./constants/note_constants");
const KeyMap = require("./constants/key_map");
const KeyActions = require("./actions/key_actions");
const KeyStore = require("./stores/key_store");

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
      points: 0,
      viewNotes: true,
      chord: chordFunctions.generate(),
      notes: []
    };
  },

  changePlayed(){
    this.setState({ notes:KeyStore.all() });
  },

  componentDidMount(){
    this.startTimer();
    KeyStore.addListener(this.changePlayed);
  },

  componentWillMount(){
    this.timeLength = 10000;
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
    console.log(this.state.chord);
    let now = new Date();
    let nowSeconds = now.getTime();
    this.timeIntervalId = setInterval(()=>{
      let newTime = new Date().getTime() - nowSeconds;
      this.setState({timer: newTime, timerPercent: this.timeState()});
      if (this.state.notes === this.state.chord.notes.sort()){
        this.restartTimer();
      }
      console.log(this.state.notes);
      console.log(this.state.chord.notes.sort());
      console.log("");
      if (newTime >= this.timeLength){
        clearInterval(this.timeIntervalId);
        this.incrementHealth(this.state.chord.notes.length-2);
        if (!this.state.gameOver){
          this.startTimer();
          this.nextChord();
        }
      }
    }, 1);
    this.timeLength = this.timeLength * 0.95;
  },

  restartTimer(){
    clearInterval(this.timeIntervalId);
    this.addPoints();
    this.startTimer();
    this.nextChord();
  },

  addPoints(){
    this.setState({ points: this.state.points+this.state.chord.pointValue()});
  },

  gameOver(){
    clearInterval(this.healthIntervalId);
    clearInterval(this.timeIntervalId);
    this.setState({ gameOver: true, chord: {note: ":", voice: "", other: "", notes: [], body(){return "(";}} });
  },

  render() {
    let notes = this.state.viewNotes ? this.state.chord.notes.join(" ") : "";
    return (
        <div>
          <div className="group windows">
            <ChordWindow chord={ this.state.chord } notes={ notes }/>
            <ScoreBoard points={this.state.points}/>
          </div>

          <ProgressBar restart={this.restartTimer} className="timer" width={ this.state.timerPercent } color="#56b6c2"/>
          <ProgressBar restart={this.healthTest} className="health" width={ this.state.healthPercent } color="red"/>
          <Piano />
        </div>
    );
  }
});


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.querySelector("#content"));
  document.addEventListener("keydown", (e)=>{
    MethodModule.playKey(KeyMap[e.key]);
    MethodModule.colorKey(KeyMap[e.key]);
    KeyActions.keyPressed(NoteConstants[KeyMap[e.key]].note);
  });
  document.addEventListener("keyup", (e)=>{
    MethodModule.revertKey(KeyMap[e.key]);
    KeyActions.keyReleased(NoteConstants[KeyMap[e.key]].note);
  });
});
