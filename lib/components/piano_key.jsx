const React = require('react');

const PianoKey = React.createClass({
  notePath(){
    return `../../assets/${this.props.instrument}/samples/${this.props.note}.wav`;
  },

  playKey(){
    document.getElementById(`${this.props.note}`).play();
  },

  render(){
    return (
      <div onClick={this.playKey}>
        <audio id={this.props.note}>
          <source src={this.notePath()} type="audio/wav"/>
        </audio>
      </div>
    );
  }

});

module.exports = PianoKey;
