const React = require('react');

const ChordWindow = React.createClass({
  render(){
    return (
      <div className="chord-window">
        <span className="note-name">A</span>
        <span className="note-voice">Maj7</span>
      </div>);
  }

});

module.exports = ChordWindow;
