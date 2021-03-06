const React = require('react');
const NoteConstants = require("../constants/note_constants");
const MethodModule = require("../util/method_module");

const PianoKey = React.createClass({
  notePath(){
    return `./assets/samples/${this.props.instrument}/${this.props.noteFileName}.mp3`;
  },

  playKey(){
    MethodModule.playKey(this.props.noteFileName);
  },

  componentDidMount(){
    document.getElementById(this.props.noteFileName).load();
  },

  margin(){
    let octave = parseInt(this.props.noteFileName.slice(-1,this.props.noteFileName.length));
    let margin = 0;
    if (this.props.color==="black"){
      margin = 510;
    }
    return margin * (octave-1);
  },

  render(){
    let hidden = "";
    let hideKey1550 = {"black": 11, "white": 16};
    let hideKey1350 = {"black": 9, "white": 14};
    if (this.props.idx > hideKey1350[this.props.color]){
      hidden = " hide-note-1350px";
    }
    if (this.props.idx > hideKey1550[this.props.color] && hidden !== ""){
      hidden = " hide-note-1550px";
    }
    return (
      <div onClick={this.playKey} className={this.props.color + " key"+hidden} id={this.props.noteFileName + "-key"} style={{"left":this.props.left, "zIndex":this.props.z, "marginLeft":this.margin()}}>

        <div className={this.props.color + "-key-map key-map"}>{NoteConstants[this.props.noteFileName].key}</div>
        <div className={this.props.color + "-note note"}>{NoteConstants[this.props.noteFileName].note}</div>
        {
          <audio id={this.props.noteFileName}>
          <source src={this.notePath()}/>
          </audio>
        }
      </div>
    );
  }

});

module.exports = PianoKey;
