const React = require('react');

const LevelButton = React.createClass({
  clicked(){
    this.props.clickCallback(this.props.level);
  },

  render(){

    return (
      <div onClick={this.clicked} className = {this.props.level + "-button level-button"}>
        {this.props.level}
      </div>
    );
  }

});

module.exports = LevelButton;
