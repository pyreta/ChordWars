const React = require('react');

const ChordWindow = React.createClass({
  render(){
    return (
      <div className="chord-window">
        <span className="note-name">{this.props.chord.note}</span>
        <span className="note-voice">{this.props.chord.body()}</span>
        <div className="chord-notes">{this.props.notes}</div>
      </div>);
  }

});

module.exports = ChordWindow;
