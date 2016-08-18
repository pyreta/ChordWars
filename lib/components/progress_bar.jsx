const React = require('react');

const ProgressBar = React.createClass({


  render(){
    return (
      <div onClick={this.props.restart} className="progress">
          <div style={{"width": this.props.width, "backgroundColor": this.props.color}} className="progress-bar"> </div>
      </div>
    );
  }

});

module.exports = ProgressBar;
