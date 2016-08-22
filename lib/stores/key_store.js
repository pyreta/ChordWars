const Store =  require("flux/utils").Store;
const PianoConstants = require("../constants/piano_constants");
const AppDispatcher = require('../dispatcher/dispatcher');
const KeyStore = new Store(AppDispatcher);

let _keys = [];
let sound = true;

KeyStore.all = () => _keys.slice(0).sort();

KeyStore.sound = function () {
  let result = sound ? true : false;
  return result;
};

KeyStore.__onDispatch = payload => {
  switch(payload.actionType) {
  case PianoConstants.KEY_PRESSED:
    KeyStore._addKey(payload.note);
    break;
  case PianoConstants.KEY_RELEASED:
    KeyStore._removeKey(payload.note);
    break;
  case PianoConstants.GROUP_UPDATE:
    KeyStore._groupUpdate(payload.notes);
    break;
  case PianoConstants.TOGGLE_SOUND:
    KeyStore._toggleSound();
    break;
  }
};

KeyStore._addKey = function (key) {
  const idx = _keys.indexOf(key);
  if (idx == -1) {
    _keys.push(key);
    this.__emitChange();
  }
};

KeyStore._groupUpdate = function (keys) {
  _keys = keys;
  this.__emitChange();
};

KeyStore._toggleSound = function () {
  sound = sound ? false : true;
  this.__emitChange();
};

KeyStore._removeKey = function (key) {
  const idx = _keys.indexOf(key);
  if (idx != -1) {
    _keys.splice(idx, 1);
    this.__emitChange();
  }
};

module.exports = KeyStore;
