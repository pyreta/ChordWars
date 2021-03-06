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
const timeLengths = {"easy": 50000, "medium":20000, "hard":10000};

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
      midiController: "No MIDI controller connected",
      sound: true,
      chord: {note: "C", voice: "", other: "", notes: [], body(){return "wars";}, pointValue(){}},
      notes: []
    };
  },

  changePlayed(){
    this.setState({ notes:KeyStore.all() });
    // for (let i = 0; i < KeyStore.all().length; i++) {
    //   if (this.state.chord.notes.indexOf(KeyStore.all()[i]) === -1 && this.difficulty === "hard"){
    //     this.incrementHealth(0.5);
    //     KeyActions.groupUpdate([]);
    //     break;
    //   }
    // }
  },

  componentDidMount(){
    KeyStore.addListener(this.changePlayed);
    KeyStore.addListener(this.setSound);
    setTimeout(()=>{
      MethodModule.removeClassFromClass("github-icon", "zoomIn");
      MethodModule.removeClassFromClass("github-icon", "animated");
    }, 1000);
  },

  updateMidiController(manufacturer, model){
    if (manufacturer){
      this.toggleKeyMap();
    }
    let midi = `${manufacturer} ${model}`.split("Port")[0].split(" ").join(" ");
    this.setState({ midiController: midi + " connected" });
  },

  componentWillMount(){
    this.setDefaults();
    let that = this;
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
        let input = WebMidi.inputs[0];
        if (input){
          that.updateMidiController(input.manufacturer, input.name);
          input.addListener('noteon', "all",
          (e)=>{
            let noteName = (e.note.name+e.note.octave).split("#").join("sharp");
            MethodModule.playKey(noteName);
            MethodModule.colorKey(noteName);
            KeyActions.keyPressed(e.note.name);
            }
          );
          input.addListener('noteoff', "all",
          (e)=>{
            let noteName = (e.note.name+e.note.octave).split("#").join("sharp");
            MethodModule.revertKey(noteName);
            KeyActions.keyReleased(e.note.name);
            }
          );
        }
      }
    });

  },

  incrementHealth(amount){
    setTimeout(()=>{
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

    }, 0);
    MethodModule.addClassToClass("red-progress", "flash");
    MethodModule.addClassToClass("red-progress", "animated");
    setTimeout(()=>{
      MethodModule.removeClassFromClass("red-progress", "flash");
      MethodModule.removeClassFromClass("red-progress", "animated");
    }, 2000);
  },

  healthTest(){
    // uncomment to test
    // this.incrementHealth(2);
  },

  playChord(notes){
    notes.forEach((note)=>{
      let noteFormat = (note+"3").split("#").join("sharp");
      MethodModule.playKey(noteFormat);
    });
    MethodModule.playKey((notes[0]+"2").split("#").join("sharp"));
    MethodModule.playKey((notes[0]+"1").split("#").join("sharp"));
  },

  nextChord(){
    MethodModule.addClassToClass("chord", "zoomIn");
    MethodModule.addClassToClass("chord", "animated");
    let nextChord = chordFunctions.generate();
    while((nextChord.notes.length >= 6) && (this.difficulty !=="hard")){
      nextChord = chordFunctions.generate();
    }
    while((nextChord.notes.length >= 4) && (this.difficulty ==="easy")){
      nextChord = chordFunctions.generate();
    }
    setTimeout(()=>{
      MethodModule.removeClassFromClass("chord", "zoomIn");
      MethodModule.removeClassFromClass("chord", "animated");
    }, 2000);
    setTimeout(()=>{
      this.playChord(nextChord.notes);
    }, 700);
    this.setState({ chord: nextChord });
  },

  startTimer(level){
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
    this.timeLength = this.timeLength * 0.90;
  },

  restartTimer(){
    clearInterval(this.timeIntervalId);
    this.addPoints();
    this.startTimer();
    this.nextChord();
  },

  addPoints(){
    this.setState({ points: this.state.points+this.state.chord.pointValue(this.difficulty)});
    MethodModule.removeClassFromClass("score", "bounce");
    MethodModule.removeClassFromClass("score", "animated");
    setTimeout(()=>{
      MethodModule.addClassToClass("score", "bounce");
      MethodModule.addClassToClass("score", "animated");
    }, 10);
  },

  gameOver(){
    MethodModule.revealEl("game-over-modal");
    MethodModule.addClassToClass("modal", "zoomIn");
    MethodModule.addClassToClass("modal", "animated");
    setTimeout(()=>{
      MethodModule.removeClassFromClass("modal", "zoomIn");
      MethodModule.removeClassFromClass("modal", "animated");
    }, 5000);
    clearInterval(this.healthIntervalId);
    clearInterval(this.timeIntervalId);
    this.setState({ gameOver: true, chord: {note: ":", voice: "", other: "", notes: [], body(){return "(";}, pointValue(){}} });
  },

  handleModalClick(level){
    this.nextChord();
    this.timeLength = timeLengths[level];
    this.difficulty = level;
    this.startTimer();
    MethodModule.hideEl("intro-modal");
  },

  setDefaults(){
    this.difficulty = "easy";
    this.timeLength = timeLengths[this.difficulty];
    this.healthLength = 10000;
  },

  reset(){
    this.setState({
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
        });

    clearInterval(this.healthIntervalId);
    this.setDefaults();
    MethodModule.revealEl("intro-modal");
    MethodModule.hideEl("game-over-modal");
  },

  render() {
    let notes = this.state.viewNotes ? this.state.chord.notes.join(" ") : "";
    return (
        <div>
          <IntroModal handleModalClick={ this.handleModalClick }/>
          <GameOverModal resetCallback={ this.reset }/>
          <div className="group windows">
            <a href="https://github.com/pyreta/ChordWars">
              <div className="github-icon backlit-text animated zoomIn">
                <i className="fa fa-github" aria-hidden="true"></i>
              </div>
            </a>
            <ChordWindow chord={ this.state.chord } notes={ notes }/>
            <ScoreBoard onClick={this.reset} points={this.state.points}/>
            <Controls notesCallback={this.toggleNotes} keyMapCallback={this.toggleKeyMap} soundCallback={this.toggleSound} chordNotesCallback={this.toggleChordNotes}/>
          </div>
          <div className = "midi-display animated slideInRight">{ this.state.midiController }</div>
          <ProgressBar className="timer" onClick={this.nextChord} width={ this.state.timerPercent } color="#56b6c2"/>
          <ProgressBar className="health" width={ this.state.healthPercent } color="red"/>
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
    if(NoteConstants[KeyMap[e.key]]){
      KeyActions.keyPressed(NoteConstants[KeyMap[e.key]].note);
    }
  });
  document.addEventListener("keyup", (e)=>{
    MethodModule.revertKey(KeyMap[e.key]);
    if(NoteConstants[KeyMap[e.key]]){
    KeyActions.keyReleased(NoteConstants[KeyMap[e.key]].note);
    }
  });
});
