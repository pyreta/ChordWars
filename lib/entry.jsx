const ReactDOM = require('react-dom');
const React = require('react');
const Piano =  require("./components/piano");
const ChordWinow =  require("./components/chord_window");
const Timer =  require("./components/timer");
const ScoreBoard =  require("./components/score_board");
const Controls =  require("./components/controls");

const App = React.createClass({

  render() {

    return (
        <div>
          <Controls />
          <ChordWinow />
          <ScoreBoard />
          <Timer />
          <Piano />
        </div>
    );
  }
});


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.querySelector("#content"));
});
