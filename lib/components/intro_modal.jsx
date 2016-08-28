const React = require('react');
const LevelButton = require("./level_button");

const IntroModal = React.createClass({


  levelClicked(level){
    this.props.handleModalClick(level);
  },

  render(){

    return (
      <div id="intro-modal">
        <div className="modal modal-background animated zoomIn"></div>

        <div className="modal modal-content animated zoomIn">
            Chord<span>Wars</span>
            <h2>Instructions:</h2>
            <p>Play the right chord before the timer runs out.  Use your QWERTY keyboard, or plug in a MIDI controller and refresh.  If you get a good score, this should increase your self-esteem drastically.</p>
            <h2>Choose difficulty:</h2>
            <LevelButton level="easy" clickCallback = {this.levelClicked}/>
            <LevelButton level="medium" clickCallback = {this.levelClicked} />
            <LevelButton level="hard" clickCallback = {this.levelClicked} />
        </div>

      </div>
    );
  }

});

module.exports = IntroModal;
