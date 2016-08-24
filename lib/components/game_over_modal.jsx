const React = require('react');
const LevelButton = require("./level_button");

const GameOverModal = React.createClass({


  render(){

    return (
      <div id="game-over-modal" className="hidden">
        <div className="modal modal-background end-modal"></div>

        <div className="modal modal-content end-modal">
            GAME OVER<span></span>
            <h2>{"Don't worry that wasn't so bad"}</h2>
            <p>Now either go into your kitchen and make a sandwich or check out the repo by clicking <a className="glow" href="https://github.com/pyreta/ChordWars">here</a></p>
            <h2>Or</h2>

            <LevelButton level="PLAY AGAIN" clickCallback = {this.props.resetCallback} />

        </div>

      </div>
    );
  }

});

module.exports = GameOverModal;
