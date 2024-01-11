let cards = [];
let cardElements = [];
let flippedCards = [];
let matchedCards = [];
let tries = 0;

function startGame(numCards) {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "flex";
  document.getElementById("game-board").style.display = "flex";
  document.getElementById("tries-counter").innerText = "Tries: 0";
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
  if (flippedCards.length === 2 || this === flippedCards[0]) return;
  this.innerHTML = `<i class="fas fa-${this.dataset.value}"></i>`;
  flippedCards.push(this);
  if (flippedCards.length === 2) {
    tries++;
    document.getElementById("tries-counter").innerText = `Tries: ${tries}`;
    setTimeout(checkForMatch, 1000);
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
  if (matchedCards.length === cardElements.length)
    toastr["success"](
      "You won in " + tries + " tries! Refresh the page to play again!"
    );
}
