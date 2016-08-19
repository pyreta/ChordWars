# ChordWars

[Heroku link][heroku]

[heroku]: https://kickrestarter.herokuapp.com/

## Minimum Viable Product

ChordWars is a game that trains the user to memorize chords.  A chord is displayed at random along with a timer, and the user has to play that chord before the clock runs out.  I plan on creating this keyboard using HTML5 audio tags, jQuery, and possibly React.js.  By the end of Week 10, this app will, at a minimum, satisfy the following criteria:


- [ ] Hosting on Heroku
- [ ] A production README
- [x] Elegant and interactive piano layout
- [x] Random chord viewer with timer
- [x] Points system


## Design Docs
* [View Wireframes][views]

[views]: docs/views.md

## Implementation Timeline

### Phase 1: Basic Piano, view window and timer setup (1 day, W 6pm)

**Objective:** Piano layout with keys changing color when pressed

- [x] Create new project
- [x] Flesh out interactive piano view using CSS and HTML
- [ ] Create instructions modal
- [x] Create note constants
- [x] Create random chord window
- [x] Create Timer window

### Phase 2: Sounds, music theory logic, and random chord display (1 day, Th 6pm)

**Objective:** Piano audio samples are linked to piano key clicks and QWERTY keyboard presses.  
Random chord appears in chord window, and timer counts down on reload

- [x] Create key press constants
- [x] Create piano sample library
- [x] Create all chord composition constants
- [x] Create chord reading function  
- [ ] Link function to window if chord is correct  

### Phase 3: Implement game structure (1 day, F 6pm)

**Objective:** Allow game to begin upon closing of modal

- [x] Create points system for chord difficulty
- [x] Tally score during game play
- [x] End game when timer runs out
- [ ] Final styling


### Bonus Features (TBD)
- [ ] Audio and visual effects
- [ ] MIDI device compatibility
- [ ] Tetris inspired stacking effect
- [ ] Music sychronized with chords
