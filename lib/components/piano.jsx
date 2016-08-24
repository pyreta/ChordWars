const React = require('react');
const PianoKey =  require("./piano_key");
const NoteConstants = require("../constants/note_constants");

const Piano = React.createClass({
  whiteKeys(){
    let whiteNotes = [];
    Object.keys(NoteConstants).forEach(note=>{
      if (!note.includes("sharp")){
        whiteNotes.push(note);
      }
    });
    let keys = whiteNotes.map((note, i)=>{
      return (
        <PianoKey
          key={i}
          id={ note }
          instrument="piano"
          className = "group key-container"
          color = "white"
          z={1}
          idx={i}
          right={0}
          noteFileName={ note }>
        </PianoKey>);
    });
    return keys;
  },

  blackKeys(){
    let blackNotes = [];
    Object.keys(NoteConstants).forEach(note=>{
      if (note.includes("sharp")){
        blackNotes.push(note);
      }
    });
    let keys = blackNotes.map((note, i)=>{
      return (
        <PianoKey
          key={i}
          instrument="piano"
          className = "group key-container"
          color = "black"
          z={i+5}
          idx={i}
          left={NoteConstants[note].left}
          noteFileName={ note }>
        </PianoKey>);
    });
    return keys;
  },

  render(){
    return (
      <div className="piano-base animated zoomIn">
        <div className="keys animated zoomIn">
          { this.whiteKeys() }
          { this.blackKeys() }
        </div>
      </div>
    );
  }

});

module.exports = Piano;
