const ReactDOM = require('react-dom');
const React = require('react');
const Piano =  require("./components/piano");
const ChordWindow =  require("./components/chord_window");
const ProgressBar =  require("./components/progress_bar");
const ScoreBoard =  require("./components/score_board");
const Controls =  require("./components/controls");
const IntroModal =  require("./components/intro_modal");
const GameOverModal =  require("./components/game_over_modal");
const chordFunctions = require("./util/chord_functions");
const MethodModule = require("./util/method_module");
const NoteConstants = require("./constants/note_constants");
const KeyMap = require("./constants/key_map");
const KeyActions = require("./actions/key_actions");
const KeyStore = require("./stores/key_store");
const timeLengths = {"easy": 50000, "medium":20000, "hard":7000};

const App = React.createClass({

  timeState() {
    let pDec = this.state.timer/this.timeLength;
    return (pDec*100).toString() + "%";
  },

  healthState() {
    let pDec = this.state.health/this.healthLength;
    return (pDec*100).toString() + "%";
  },

  toggleVisible(klass, bool){
    if(bool){
      MethodModule.addClassToClass(klass, "invisible");
      MethodModule.removeClassFromClass(klass, "visible");
      MethodModule.removeClassFromClass(klass+"-toggle-button", "glow");
    } else {
      MethodModule.removeClassFromClass(klass, "invisible");
      MethodModule.addClassToClass(klass, "visible");
      MethodModule.addClassToClass(klass+"-toggle-button", "glow");
    }
  },

  toggleKeyMap(){
    this.toggleVisible("key-map", this.state.keyMapVisible);
    let newState = this.state.keyMapVisible ? false : true;
    this.setState({ keyMapVisible: newState });
  },

  toggleNotes(){
    this.toggleVisible("note", this.state.notesVisible);
    let newState = this.state.notesVisible ? false : true;
    this.setState({ notesVisible: newState });
  },

  toggleChordNotes(){
    this.toggleVisible("chord-notes", this.state.chordNotesVisible);
    let newState = this.state.chordNotesVisible ? false : true;
    this.setState({ chordNotesVisible: newState });
  },

  toggleSound(){
    KeyActions.toggleSound();
  },

  setSound(){
    console.log("SOUNDDD");
    this.setState({ sound: KeyStore.sound() });
    if (KeyStore.sound()){
      MethodModule.addClassToClass("sound-toggle-button", "glow");
    } else {
      MethodModule.removeClassFromClass("sound-toggle-button", "glow");
    }
  },

  getInitialState(){
    return {
      healthPercent: "0%",
      timerPercent: "0%",
      timer: 0,
      health: 0,
      gameOver: false,
      points: 0,
      notesVisible: true,
      chordNotesVisible: true,
      keyMapVisible: true,
      difficulty: "easy",
      timeLength: 100000,
      viewNotes: true,
      sound: true,
      chord: {note: "C", voice: "", other: "", notes: [], body(){return "wars";}, pointValue(){}},
      notes: []
    };
  },

  changePlayed(){
    this.setState({ notes:KeyStore.all() });
  },

  componentDidMount(){
    KeyStore.addListener(this.changePlayed);
    KeyStore.addListener(this.setSound);
  },

  componentWillMount(){
    this.difficulty = "easy";
    this.timeLength = timeLengths[this.difficulty];
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

  startTimer(level){
    console.log(this.state.chord);
    let now = new Date();
    let nowSeconds = now.getTime();
    this.timeIntervalId = setInterval(()=>{
      let newTime = new Date().getTime() - nowSeconds;
      this.setState({timer: newTime, timerPercent: this.timeState()});
      if (this.state.notes.join("") === this.state.chord.notes.slice(0).sort().join("")){
        this.restartTimer();
      }
      if (newTime >= this.timeLength){
        clearInterval(this.timeIntervalId);
        this.incrementHealth(this.state.chord.notes.length-2);
        if (!this.state.gameOver){
          this.startTimer();
          this.nextChord();
        }
      }
    }, 1);
    if (this.difficulty !== "easy") {
      this.timeLength = this.timeLength * 0.95;
    }
  },

  restartTimer(){
    clearInterval(this.timeIntervalId);
    this.addPoints();
    this.startTimer();
    this.nextChord();
  },

  addPoints(){
    this.setState({ points: this.state.points+this.state.chord.pointValue(this.difficulty)});
  },

  gameOver(){
    MethodModule.revealEl("game-over-modal");
    clearInterval(this.healthIntervalId);
    clearInterval(this.timeIntervalId);
    this.setState({ gameOver: true, chord: {note: ":", voice: "", other: "", notes: [], body(){return "(";}, pointValue(){}} });
  },

  handleModalClick(level){
    this.nextChord();
    this.timeLength = timeLengths[level];
    this.difficulty = level;
    // this.setState({ difficulty: level, timeLength: timeLengths[level] });
    this.startTimer();
    // console.log(level);
    // console.log(this.timeLength);
    MethodModule.hideEl("intro-modal");
  },

  render() {
    let notes = this.state.viewNotes ? this.state.chord.notes.join(" ") : "";
    return (
        <div>
          <IntroModal handleModalClick={ this.handleModalClick }/>
          <GameOverModal handleModalClick={ this.handleModalClick }/>
          <div className="group windows">
            <ChordWindow chord={ this.state.chord } notes={ notes }/>
            <ScoreBoard points={this.state.points}/>
            <Controls notesCallback={this.toggleNotes} keyMapCallback={this.toggleKeyMap} soundCallback={this.toggleSound} chordNotesCallback={this.toggleChordNotes}/>
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
