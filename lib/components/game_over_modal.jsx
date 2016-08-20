const React = require('react');
const LevelButton = require("./level_button");

const GameOverModal = React.createClass({


  resetClicked(level){
    console.log("reset");
    // this.props.handleModalClick(level);
  },

  render(){

    return (
      <div id="game-over-modal" className="hidden">
        <div className="modal modal-background fade-in-op"></div>

        <div className="modal modal-content fade-in">
            Game<span>Over</span>
            <h2>{"Don't worry that wasn't so bad"}</h2>
            <p>Now either go make a sandwich or check out the repo by clicking <a href="#">here</a></p>
            <h2>Or</h2>
            <LevelButton level="Play Again" clickCallback = {this.resetClicked} />
        </div>

      </div>
    );
  }

});

module.exports = GameOverModal;
