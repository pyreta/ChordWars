const React = require('react');

const Controls = React.createClass({
  render(){
    return (
      <div className="chord-window controls">
        CONTROLS
        <div onClick={ this.props.notesCallback }>NOTES</div>
        <div onClick={ this.props.keyMapCallback }>KEYMAP</div>
      </div>
    );
  }

});

module.exports = Controls;
