const Note = require("./Note");

class Chord {
  constructor(options) {
    this.note = options.note;
    this.character = options.character;
    this.voice = options.voice;
    this.dominant = options.dominant;
    this.notes = this.findNotes();
  }

  type(){
    let chordType = this.character;
    if (this.dominant) chordType = "dom";
    return (chordType + this.voice).toLowerCase();
  }

  findNotes(){
    let n = new Note(this.note);
    let notes;
    switch (this.type()) {
      case "maj":
          notes = [n.root, n.majThird, n.fifth];
        break;
      case "min":
          notes = [n.root, n.minThird, n.fifth];
        break;
      case "maj6":
          notes = [n.root, n.majThird, n.fifth, n.majSixth];
        break;
      case "min6":
          notes = [n.root, n.minThird, n.fifth, n.majSixth];
        break;
      case "maj7":
          notes = [n.root, n.majThird, n.fifth, n.majSeventh];
        break;
      case "min7":
          notes = [n.root, n.minThird, n.fifth, n.minSeventh];
        break;
      case "dom7":
          notes = [n.root, n.majThird, n.fifth, n.minSeventh];
        break;
      case "maj9":
          notes = [n.root, n.majThird, n.fifth, n.majSeventh, n.ninth];
        break;
      case "min9":
          notes = [n.root, n.minThird, n.fifth, n.minSeventh, n.ninth];
        break;
      case "dom9":
          notes = [n.root, n.majThird, n.fifth, n.minSeventh, n.ninth];
        break;

    }
    return notes;
  }

  body() {
    let character = this.character;
    if (this.dominant) character = "";
    return character+this.voice;
  }

  pointValue(){
    return this.notes.length * 47;
  }
}


module.exports = Chord;
