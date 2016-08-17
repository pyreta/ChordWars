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

  render(){
    return (
      <div onClick={this.playKey} className = {this.props.color} style={{"left":this.props.left, "z-index":this.props.z}}>
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
