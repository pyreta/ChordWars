const React = require('react');

const Controls = React.createClass({
  render(){
    return (
      <div className="chord-window controls">
        CONTROLS

        <div className={"reveal-notes reveal-button glow"} onClick={ this.props.notesCallback }>KEY NOTES</div>
        <div className={"reveal-map reveal-button glow"} onClick={ this.props.keyMapCallback }>KEYMAP</div>
        <div className={"reveal-map reveal-button glow"} onClick={ this.props.keyMapCallback }>CHORD NOTES</div>
      </div>
    );
  }

});

module.exports = Controls;
