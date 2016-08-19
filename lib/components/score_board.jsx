const React = require('react');
const MethodModule = require('../util/method_module');

const ScoreBoard = React.createClass({
  render(){
    return (
      <div className="score-board">
        <div className="score">{MethodModule.parseAmount(this.props.points)}</div>
        Points
      </div>);
  }

});

module.exports = ScoreBoard;
