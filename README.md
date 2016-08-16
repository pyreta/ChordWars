# ChordWars

[Heroku link][heroku]

[heroku]: https://kickrestarter.herokuapp.com/

## Minimum Viable Product

ChordWars is a game that trains the user to memorize chords.  A chord is displayed at random along with a timer, and the user has to play that chord before the clock runs out.  I plan on creating this keyboard using HTML5 audio tags, jQuery, and possibly React.js.  By the end of Week 10, this app will, at a minimum, satisfy the following criteria:


- [ ] Hosting on Heroku
- [ ] A production README
- [ ] Elegant and interactive piano layout
- [ ] Random chord viewer with timer
- [ ] Points system


## Design Docs
* [View Wireframes][views]

[views]: docs/views.md

## Implementation Timeline

### Phase 1: Basic Piano, view window and timer setup (1 day, W 6pm)

**Objective:** Piano layout with keys changing color when pressed

- [ ] Create new project
- [ ] Flesh out interactive piano view using CSS and HTML
- [ ] Create instructions modal
- [ ] Create note constants
- [ ] Create random chord window
- [ ] Create Timer window

### Phase 2: Sounds, music theory logic, and random chord display (1 day, Th 6pm)

**Objective:** Piano audio samples are linked to piano key clicks and QWERTY keyboard presses.  
Random chord appears in chord window, and timer counts down on reload

- [ ] Create key press constants
- [ ] Create piano sample library
- [ ] Create all chord composition constants
- [ ] Create chord reading function  
- [ ] Link function to window if chord is correct  

### Phase 3: Implement game structure (1 day, F 6pm)

**Objective:** Allow game to begin upon closing of modal

- [ ] Create points system for chord difficulty
- [ ] Tally score during game play
- [ ] End game when timer runs out
- [ ] Final styling


### Bonus Features (TBD)
- [ ] Audio and visual effects
- [ ] MIDI device compatibility
- [ ] Tetris inspired stacking effect
- [ ] Music sychronized with chords
