const top1 = document.getElementById("top-1");
const top2 = document.getElementById("top-2");
const top3 = document.getElementById("top-3");
const top4 = document.getElementById("top-4");
const top5 = document.getElementById("top-5");
const position = document.getElementById("current-position");
const score = document.getElementById("current-score");

const renderRanking = (currentScore) => {
  var ranking = new Array(6);
  var currentPosition = null;
  var currentScore = null;
  // localStorage.clear();
  //check current ranking exist in storage
  if (localStorage.getItem("top" + 0) !== null) {
    for (let i = 0; i <= 5; i++) {
      ranking[i] = localStorage.getItem("top" + i);
    }
  } else {
    for (let i = 0; i <= 5; i++) {
      localStorage.setItem("top" + i, 0);
    }
  }

  //check temp current scor exist
  if (localStorage.getItem("currentScore") === null) {
    localStorage.setItem("currentScore", 0);
  }
  currentScore = localStorage.getItem("currentScore");

  //check current position exist
  if (localStorage.getItem("currentPosition") === null) {
    localStorage.setItem("currentPosition", 5);
  }

  currentPosition = localStorage.getItem("currentPosition");

  if (currentPosition == 0) {
    ranking[0] = currentScore;
    localStorage.setItem("top0", currentScore);
  } else {
    ranking[currentPosition] = currentScore;
    localStorage.setItem("top" + currentPosition, currentScore);
    for (let i = currentPosition; i > 0; i--) {
      if (currentScore >= ranking[i - 1]) {
        var temp = ranking[i - 1];
        ranking[i] = temp;
        ranking[i - 1] = currentScore;
        localStorage.setItem("currentPosition", i - 1);
        // localStorage.setItem("top" + currentPosition, temp);
      } else break;
    }
  }

  if (typeof ranking[0] != "undefined") {
    for (let i = 0; i <= 5; i++) {
      localStorage.setItem("top" + i, ranking[i]);
    }
  }

  currentPosition = localStorage.getItem("currentPosition");
  //show current position
  position.innerHTML = +currentPosition + 1;
  //show current score
  score.innerHTML = currentScore;

  //show ranking and mark current position
  for (let i = 0; i < 5; i++) {
    document.getElementById(`top-${i}`).innerHTML = ranking[i];
    document.getElementsByClassName(`top-${i}`)[0].classList.remove("active");
  }
  if (currentPosition < 4) {
    document
      .getElementsByClassName(`top-${currentPosition}`)[0]
      .classList.add("active");
  } else {
    position.innerHTML = '#';
  }
};
renderRanking();

window.addEventListener("load", () => {
  localStorage.setItem("currentScore", 0);
  localStorage.setItem("currentPosition", 5);
  renderRanking();
});
