const CHOICES            = ["rock", "paper", "scissors"];
const PLAYER_WIN_LABEL   = "player win";
const COMPUTER_WIN_LABEL = "computer win";
const TIE_LABEL          = "tie";
const results            = [];

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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
  const message = "It's a tie, play again!"
  console.info(message);

  return results.push(TIE_LABEL);
}

function handlePlayerWin() {
  const message = "You win! Great job!"
  console.info(message);

  return results.push(PLAYER_WIN_LABEL);
}

function handlePlayerLoss() {
  const message = "You lose! Better luck next time!"
  console.info(message);

  return results.push(COMPUTER_WIN_LABEL);
}

function numPlayerWins() {
  return results.filter((item) => item === PLAYER_WIN_LABEL).length;
}

function numComputerWins() {
  return results.filter((item) => item === COMPUTER_WIN_LABEL).length;
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
  for (let i = 0; i < 5; i++) {
    console.info(`Game ${i}:`);
    playRound();
    console.info(`Results so far: ${results.join(", ")}`)
    console.info("\n");
  }

  if (numPlayerWins() > numComputerWins()) {
    console.info("You win! Way to go!");
  }

  if (numComputerWins() > numPlayerWins()) {
    console.info("Computer wins! Better luck next time!");
  }

  if (numPlayerWins() === numComputerWins()) {
    console.info("Somehow it's a tie! What are the odds!");
  }
}

game();
