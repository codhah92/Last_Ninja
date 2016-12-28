## Ninja

[Live](https://codhah92.github.io/Last_Ninja/)

### Background

Our ninjas never get tired. However, ninja stars do hurt them. Ninja is an 'Endless Flyer' inspired by the addictive worldwide hit Asteroids and Flappy Bird. Instead of dodging immobile pipes, however, our ninjas must dodge moving ninja stars sent from enemy ninjas. Help our ninjas get back to their village!

### Functionality & MVP

With Ninja, users will be able to:

- [ ] Navigate through forests while dodging ninja stars
- [ ] Understand rules and commands through a modal
- [ ] Bonus: Select an avatar of their choice

This project will also include:

- [ ] A Production README

### Wireframes

This will be a single screen application with navigation links to the game's Github, my LinkedIn, and the About modal.

<img src="./docs/main.png" />

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jQuery` to implement game structure and logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve various scripts.

In addition to the webpack entry file, the following scripts will be included:
- [x] `game.js`
- [x] `game_view.js`
- [x] `ninja.js`
- [x] `moving_object.js`

### Implementation Timeline

**Day 1**:
- Setup Node modules and webpack
- Write a basic entry file and the bare bones of all scripts
- Be able to understand how to render an object on `Canvas` and move object and environment

**Day 2**:

- Build `game`, `game_view`, `moving_object`, `ninja` in that order
- Be able to move ninja up and down
- Be able to trigger proper responses to collisions
- Have environment moving to left at constant speed

**Day 3**:

- Create backend to allow for global high score board
- Develop About modal with instructions and details
- Style visuals


**Day 4**:

- Continue styling and refactor code
- Work on bonus features

### Bonus features

- [x] Left and right movement of ninja for a more dynamic game
- [x] Ninja can throw kunais to deflect enemy stars
- [ ] HP bar/Power up options
