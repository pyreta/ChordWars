const NoteConstants = require("../constants/note_constants");
const Chord = require("./Chord");
const Note = require("./Note");

let dummyChords=[
  {note: "A", voice: "Maj", other: "", notes: ["A", "B", "C"]},
  {note: "D#", voice: "min", other: "", notes: ["A", "B", "C"]},
  {note: "B", voice: "Dom", other: "7", notes: ["A", "B", "C", "D"]},
  {note: "E", voice: "min", other: "7", notes: ["A", "B", "C", "D"]},
  {note: "C", voice: "sus", other: "9", notes: ["A", "B", "C", "D", "E"]},
];


module.exports = {

  randomEl(array){
    return array[Math.floor(Math.random() * array.length)];
  },

  generateTest(){
    return this.randomEl(dummyChords);
  },

  randomNote() {
    let allNotes = [];
    Object.keys(NoteConstants).forEach((note)=>{
      let noteObj = NoteConstants[note];
      if (!allNotes.includes(noteObj.note)){
        allNotes.push(noteObj.note);
      }
    });
    return this.randomEl(allNotes);
  },

  randomVoice(){
    if (Math.random() > 0.5) return "";
    return this.randomEl(["7","7","9","11","13"]);
  },

  randomDominant() {
    return this.randomEl([false, true, true, false]);
  },

  randomCharacter(){
    return this.randomEl(["Maj", "min"]);
  },

  generate(){
    let chosenVoice = this.randomVoice();
    let chosenDominant = chosenVoice === "" ? false : this.randomDominant();
    let chordData = {
      note: this.randomNote(),
      character: this.randomCharacter(),
      voice: chosenVoice,
      dominant: chosenDominant
    };
    return new Chord(chordData);
  }
};
