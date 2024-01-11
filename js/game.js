let cards = [];
let cardElements = [];
let flippedCards = [];
let matchedCards = [];
let tries = 0;
let startTime, endTime, timerInterval;
let playerName;

function startGame(numCards) {
  let nameInput = document.getElementById("name-input");

  playerName = nameInput.value.trim();

  if (!playerName) {
    toastr.error("Please enter your name!");
    return;
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "flex";
  document.getElementById("game-board").style.display = "flex";
  tries = 0;

  cards = [];
  let icons = [
    "yin-yang",
    "anchor",
    "baby",
    "bicycle",
    "wifi",
    "user-graduate",
    "truck-monster",
    "tablet-alt",
  ];
  for (let i = 0; i < numCards / 2; i++) {
    cards.push(icons[i]);
    cards.push(icons[i]);
  }
  createCards();
  startTimer();
}

function createCards() {
  let gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  cardElements = [];
  flippedCards = [];
  matchedCards = [];
  cards.sort(() => Math.random() - 0.5);

  for (let i = 0; i < cards.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    card.dataset.value = cards[i];
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
    cardElements.push(card);
  }
}

function flipCard() {
  if (this.classList.contains("matched")) return;

  if (flippedCards.length === 2 || this === flippedCards[0]) return;
  this.innerHTML = `<i class="fas fa-${this.dataset.value}"></i>`;
  flippedCards.push(this);
  if (flippedCards.length === 2) {
    tries++;
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  let isMatch = flippedCards[0].dataset.value === flippedCards[1].dataset.value;
  if (isMatch) {
    flippedCards.forEach((card) => card.classList.add("matched"));
    matchedCards = matchedCards.concat(flippedCards);
  } else {
    flippedCards.forEach((card) => {
      card.innerHTML = "";
    });
  }
  flippedCards = [];

  if (matchedCards.length === cardElements.length) {
    endTime = new Date();
    let timeDiff = (endTime - startTime) / 1000; // in seconds

    toastr["success"](
      `Awesome job, ${playerName}! You won in ${tries} tries and ${timeDiff.toFixed(
        1
      )} seconds! Refresh the page to play again!`
    );

    clearInterval(timerInterval);
  }
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (startTime) {
    let currentTime = new Date();
    let elapsedTime = (currentTime - startTime) / 1000;
  }
}
