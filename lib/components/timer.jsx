const React = require('react');

const Timer = React.createClass({

  timePassed() {
    // let pDec = this.props.campaign.amount_pledged/this.props.campaign.goal;
    let pDec = 0.30;
    return (Math.floor(pDec*100)).toString() + "%";
  },

  render(){
    return (
      <div className="timer">
          <div style={{width: this.timePassed()}} className="time-passed"> </div>
      </div>
    );
  }

});

module.exports = Timer;
