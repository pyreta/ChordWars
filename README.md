# ChordWars

[ChordWars live][live]

[live]: https://pyreta.github.io/ChordWars/

ChordWars is single page browser game designed for music education.  Upon starting the game, the player must play a randomly displayed chord on a virtual piano before the time runs out.  If the chord is not played in time, the penalty bar will rise.  Once the penalty bar reaches a certain threshold, the game is over.  ChordWars is built with a React.js and flux architecture allowing for seamless animation and a dynamic user interface.

## Features & Implementation


### Single-Page App

  ChordWars is a single page app that renders everything within one element on the root page using React.js.  Each of the components behave in different ways according to various independent states.

### This production README is not finished, so don't even both reading on.

  `Campaign`s are stored in the database as belonging to a `creator`, and having many `rewards`.  Upon rendering the `Campaign` show page, rewards are collected through a non n+1 SQL call to join the `rewards` and `campaigns` tables.  Unlimited `reward`s may be created at the same time the `campaign` is created, and then all the information is sent to the database together.

  ![image of campaign form](docs/kickrestarter.png)

  `Campaign`index items dynamically reflect the percent pledged through a progress bar with a width calculated in real time:

  ![image of progress-bar code](docs/progress-bar.png)


### Pledges

  `Pledges` are the join table that links `rewards` with `campaigns` and `users`.  `User`s can have many `rewards` through their `pledges` and a `campaign` can have many `backers` through `pledges`.  The `campaign` display page has React components for each linked `reward` which aggregates the total number of `backer`s for each reward through it's `pledges.`  Users can select `reward`s from this page and choose to   make a `pledge` for a minimum amount.

### Search

Searching campaigns is a standard feature of Kickstarter.  Users can do a realtime search right from the Navbar.
