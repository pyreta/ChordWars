const React = require('react');
const LevelButton = require("./level_button");

const IntroModal = React.createClass({


  levelClicked(level){
    this.props.handleModalClick(level);
  },

  render(){

    return (
      <div id="intro-modal">
        <div className="modal modal-background fade-in-op"></div>

        <div className="modal modal-content fade-in">
            Chord<span>Wars</span>
            <h2>Instructions:</h2>
            <p>Play the right chord before the timer runs out.  Use the controls to reveal notes of the chord, notes of each key, and keyboard mapping.  If you get a good score, this should increase your self-esteem drastically.</p>
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
