const CHOICES = ["rock", "paper", "scissors"];
const GAMES_PER_ROUND = 5;

const results = [];
const score = { player: 0, computer: 0 };

const sample = (array) => array[Math.floor(Math.random() * array.length)];

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
}

function handlePlayerWin() {
  console.info("Player wins the round!");
  return score.player++;
}

function handlePlayerLoss() {
  console.info("Computer wins the round!");
  return score.computer++;
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
  for (let i = 0; i < GAMES_PER_ROUND; i++) {
    console.info(`Game ${i}:`);
    playRound();
    console.info(`Results so far: Player: ${score.player} / Computer: ${score.computer}`);
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

game();
