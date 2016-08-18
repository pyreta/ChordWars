const React = require('react');

const ChordWindow = React.createClass({
  render(){
    return (
      <div className="chord-window">
        <span className="note-name">{this.props.chord.note}</span>
        <span className="note-voice">{this.props.chord.voice + this.props.chord.other}</span>
      </div>);
  }

});

module.exports = ChordWindow;
