const AppDispatcher = require("../dispatcher/dispatcher");
const PianoConstants = require("../constants/piano_constants");

const KeyActions = {
  groupUpdate(notes) {
    AppDispatcher.dispatch({
      actionType: PianoConstants.GROUP_UPDATE,
      notes
    });
  },

  keyPressed(noteName) {
    AppDispatcher.dispatch({
      actionType: PianoConstants.KEY_PRESSED,
      note: noteName
    });
  },

  keyReleased(noteName) {
    AppDispatcher.dispatch({
      actionType: PianoConstants.KEY_RELEASED,
      note: noteName
    });
  },

  toggleSound() {
    AppDispatcher.dispatch({
      actionType: PianoConstants.TOGGLE_SOUND,
    });
  }
};

module.exports = KeyActions;
