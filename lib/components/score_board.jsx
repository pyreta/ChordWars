const React = require('react');
const MethodModule = require('../util/method_module');

const ScoreBoard = React.createClass({
  render(){
    return (
      <div className="score-board animated fadeInDown">
        <div className="score bounce animated">{MethodModule.parseAmount(this.props.points)}</div>
        Points
      </div>);
  }

});

module.exports = ScoreBoard;
