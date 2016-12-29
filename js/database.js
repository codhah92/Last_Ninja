const compareHighScores = (highScores) => {
  const allHighScores = Object.keys(highScores);
  const idx = allHighScores.indexOf('lowestHighScore');
  const sortedHighScores =
    allHighScores.slice(0, idx).concat(allHighScores.slice(idx + 1));

  sortedHighScores.sort((x, y) => {
    if (highScores[x] < highScores[y]){
      return 1;
    } else {
      return -1;
    }
  });

  return sortedHighScores;
};

const createHighScores = (sortedHighScores, highScores) => {
  const highScoreList = $('.high-score-list');

  for (let i = 0; i < sortedHighScores.length; i++) {
    let highScore = $('<li>');
    let player = sortedHighScores[i];
    highScore.text(`${player} - ${highScores[player]}`);
    highScoreList.append(highScore);
  }
};

const lowestHighScore = (database, score, highScores, sortedHighScores) => {
  const newLowest = highScores[sortedHighScores[9]];
  const oldLowest = highScores[sortedHighScores[10]];
  database.ref(`highscores/low`).set(newLowest);
  if (oldLowest) {
    database.ref(`highscores/${sortedHighScores[10]}`).remove();
  }
};

const renderHighScores = (database, score, newHighScore) => {
  $('.high-score-form').removeClass('hidden');
  $('.form')[0].value = '';
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = $('.form')[0].value;
    const player = `${name}`;
    database.ref(`highscores/${player}`).set(score);
    $('.high-score-form').addClass('hidden');
    $('.high-score').removeClass('hidden');
    newHighScore();
    $('.hs-form').off('submit', handleSubmit);
  };
  $('.hs-form').on('submit', handleSubmit);
};


const Database = {
  getHighScores(view, database) {
    let highScores;
    let sortedHighScores;

    database.ref(`highscores/`).on('value', (snapshot) => {
      highScores = snapshot.val();
      sortedHighScores = compareHighScores(highScores);
      createHighScores(sortedHighScores, highScores);
    });
  },

  setHighScore(database, score) {
    const newHighScore = () => {
      database.ref(`highscores/`).once('value').then((snapshot) => {
        const highScores = snapshot.val();
        const sortedHighScores = compareHighScores(highScores);
        lowestHighScore(database, score, highScores, sortedHighScores);
      });
    };
    renderHighScores(database, score, newHighScore);
  },
};

module.exports = Database;
