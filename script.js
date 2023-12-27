const CHOICES = ["rock", "paper", "scissors"];
const SCORE_LIMIT = 5;

const score = { player: 0, computer: 0 };

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const rockButton = document.querySelector("#rock");
rockButton.addEventListener("click", () => playRound("rock"));

const paperButton = document.querySelector("#paper");
paperButton.addEventListener("click", () => playRound("paper"));

const scissorsButton = document.querySelector("#scissors");
scissorsButton.addEventListener("click", () => playRound("scissors"));

const messageDisplay       = document.querySelector("#result");
const playerScoreDisplay   = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");

function getPlayerChoice() {
  const choice = prompt("Choose rock, paper, or scissors!").toLowerCase();
  console.info(`Player chose: ${choice}`);

  return choice;
}

function getComputerChoice() {
  const choice = sample(CHOICES);
  console.info(`Computer chose: ${choice}`);

  return choice;
}

function handleTie() {
  console.info("Round is a tie!");

  flashUpdate(messageDisplay, "Draw");
}

function handlePlayerWin() {
  score.player++;

  console.info(`Player wins the round and has ${score.player} point(s).`);

  flashUpdate(playerScoreDisplay, score.player);
  flashUpdate(messageDisplay, "Player wins");

  if (score.player >= SCORE_LIMIT) handleGameEnd();
}

function handlePlayerLoss() {
  score.computer++;

  console.info(`Computer wins the round and has ${score.computer} point(s).`);

  flashUpdate(computerScoreDisplay, score.computer);
  flashUpdate(messageDisplay, "Computer wins");

  if (score.computer >= SCORE_LIMIT) handleGameEnd();
}

function handleGameEnd() {
  rockButton.disabled = true;
  paperButton.disabled = true;
  scissorsButton.disabled = true;

  let message = ""

  if (score.player > score.computer) {
    message = "You win! Way to go!"

    console.info(message);
    flashUpdate(messageDisplay, message);
  }

  if (score.computer > score.player) {
    message = "Computer wins! Better luck next time!"

    console.info(message);
    flashUpdate(messageDisplay, message);
  }
}

function flashUpdate(element, value, duration = 200) {
  element.classList.add("hidden");

  setTimeout(() => {
    element.innerHTML = value
    element.classList.remove("hidden");
    element.classList.add("visible");
  }, duration);
}

function playRound(playerChoice = getPlayerChoice(), computerChoice = getComputerChoice()) {
  switch (playerChoice) {
    case "rock":
      switch (computerChoice) {
        case "rock":     return handleTie();
        case "paper":    return handlePlayerLoss();
        case "scissors": return handlePlayerWin();
      }
    case "paper":
      switch (computerChoice) {
        case "rock":     return handlePlayerWin();
        case "paper":    return handleTie();
        case "scissors": return handlePlayerLoss();
      }
    case "scissors":
      switch (computerChoice) {
        case "rock":     return handlePlayerLoss();
        case "paper":    return handlePlayerWin();
        case "scissors": return handleTie();
      }
  }
}
