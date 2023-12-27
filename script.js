const CHOICES = ["rock", "paper", "scissors"];
const GAMES_PER_ROUND = 5;

const score = { player: 0, computer: 0 };

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const resultDisplay        = document.querySelector("#result");
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

  flashUpdate(resultDisplay, "Draw", 200);
}

function handlePlayerWin() {
  score.player++;

  console.info(`Player wins the round and has ${score.player} point(s).`);

  flashUpdate(playerScoreDisplay, score.player, 200);
  flashUpdate(resultDisplay, "Player wins", 200);
}

function handlePlayerLoss() {
  score.computer++;

  console.info(`Computer wins the round and has ${score.computer} point(s).`);

  flashUpdate(computerScoreDisplay, score.computer, 200);
  flashUpdate(resultDisplay, "Computer wins", 200);
}

function flashUpdate(element, value, duration) {
  element.classList.add("hidden");

  setTimeout(() => {
    element.innerHTML = value
    element.classList.remove("hidden");
    element.classList.add("visible");
  }, duration);
}

function playRound(playerChoice = getPlayerChoice(), computerChoice = getComputerChoice()) {
  if (!CHOICES.includes(playerChoice)) {
    alert("You must choose rock, paper, or scissors. Choose again!");
    playerChoice = getPlayerChoice();
  }

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

function game() {
  for (let i = 1; i <= GAMES_PER_ROUND; i++) {
    console.info(`Game ${i}:`);
    playRound();
    console.info(`Results so far: Player ${score.player} / Computer ${score.computer}`);
    console.log("\n");
  }

  if (score.player > score.computer) {
    return console.info("You win! Way to go!");
  }

  if (score.computer > score.player) {
    return console.info("Computer wins! Better luck next time!");
  }

  if (score.player === score.computer) {
    return console.info("It's a tie! What are the odds!");
  }
}

const rockButton = document.querySelector("#rock");
rockButton.addEventListener("click", () => playRound("rock"));

const paperButton = document.querySelector("#paper");
paperButton.addEventListener("click", () => playRound("paper"));

const scissorsButton = document.querySelector("#scissors");
scissorsButton.addEventListener("click", () => playRound("scissors"));
