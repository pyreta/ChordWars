const NoteConstants = require("../constants/note_constants");

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

  generate(){
    return this.randomEl(dummyChords);  },

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
    return this.randomEl(["Major", "minor"]);
  }
};
