const Notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",];
const semitones = ["root","flat_second","second", "min_third", "maj_third", "fourth", "flat_fifth", "fifth",
		"sharp_fifth", "maj_six", "min_seven", "maj_seven", "upper_octave","flat_nine", "nine", "sharp_nine",
    "flat_eleven", "eleven", "sharp_eleven", "fifth_octave_up","sharp_fifth_octave_up","thirteen", "min_seven_up",
    "maj_seven_up","second_octave_up"];

class Note {
  constructor(note) {
    this.root = note;
    this.note = note;
    this.noteIndex = Notes.indexOf(note);
    this.minThirdIndex = this.findSemitoneIndex(3);
    this.majThirdIndex = this.findSemitoneIndex(4);
    this.fifthIndex = this.findSemitoneIndex(7);
    this.majSixthIndex = this.findSemitoneIndex(9);
    this.minSeventhIndex = this.findSemitoneIndex(10);
    this.majSeventhIndex = this.findSemitoneIndex(11);
    this.ninthIndex = this.findSemitoneIndex(14);

    this.minThird = Notes[this.minThirdIndex];
    this.majThird = Notes[this.majThirdIndex];
    this.fifth = Notes[this.fifthIndex];
    this.majSixth = Notes[this.majSixthIndex];
    this.minSeventh = Notes[this.minSeventhIndex];
    this.majSeventh = Notes[this.majSeventhIndex];
    this.ninth = Notes[this.ninthIndex];
  }

  findSemitoneIndex(semitones){
    return (this.noteIndex + semitones) % Notes.length;
  }
}
module.exports = Note;
