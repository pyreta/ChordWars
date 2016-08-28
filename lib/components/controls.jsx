const React = require('react');

const Controls = React.createClass({
  render(){
    return (
      <div className="chord-window controls animated zoomIn">
        Controls

        <div className={"note-toggle-button reveal-button glow"} onClick={ this.props.notesCallback }>KEY NOTES</div>
        <div className={"key-map-toggle-button reveal-button glow"} onClick={ this.props.keyMapCallback }>QWERTY MAP</div>
        <div className={"chord-notes-toggle-button reveal-button glow"} onClick={ this.props.chordNotesCallback }>CHORD NOTES</div>
        <div className={"sound-toggle-button reveal-button glow"} onClick={ this.props.soundCallback }>SOUND</div>
      </div>
    );
  }

});

module.exports = Controls;
