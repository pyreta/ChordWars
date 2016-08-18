const React = require('react');
const NoteConstants = require("../constants/note_constants");
const PianoKey = React.createClass({
  notePath(){
    return `../assets/samples/${this.props.instrument}/${this.props.noteFileName}.mp3`;
  },

  playKey(){
    let el = document.getElementById(`${this.props.noteFileName}`);
    el.pause();
    el.load();
    el.play();
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

    return (
      <div onClick={this.playKey} className = {this.props.color + " key"} style={{"left":this.props.left, "zIndex":this.props.z, "marginLeft":this.margin()}}>
        {NoteConstants[this.props.noteFileName].note}
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
